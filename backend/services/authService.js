const admin = require('../config/firebase');
const axios = require('axios');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const emulatorHost = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const apiKey = process.env.EMULATOR_API_KEY;
const baseUrl = `http://${emulatorHost}/identitytoolkit.googleapis.com/v1/accounts`;

exports.register = async ({ fullName, email, password, role = 'member' }) => {
  // 1) Hash and store credentials in Postgres
  const passwordHash = await bcrypt.hash(password, 10);
  await userModel.createUser({ fullname: fullName, email, passwordHash, role });

  // 2) Create user in Firebase Auth
  const userRecord = await admin.auth().createUser({
    email,
    password,
    displayName: fullName,
  });

  // 3) Set custom claims to include role
  await admin.auth().setCustomUserClaims(userRecord.uid, { role });

  // 4) Create a custom token for immediate sign-in
  const customToken = await admin.auth().createCustomToken(userRecord.uid, { role });

  // 5) Exchange custom token for ID token
  try {
    const { data } = await axios.post(
      `${baseUrl}:signInWithCustomToken?key=${apiKey}`,
      { token: customToken, returnSecureToken: true }
    );

    // Return the ID token for the client to use
    return data.idToken;
  } catch (error) {
    console.error('Error exchanging custom token:', error.response?.data || error.message);
    throw Object.assign(new Error('Authentication failed'), { status: 500 });
  }
};

exports.login = async ({ email, password }) => {
  // 1) Verify credentials in Postgres
  const user = await userModel.findUserByEmail(email);
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  // 2) Check if user exists in Firebase, create if not
  let userRecord;
  try {
    userRecord = await admin.auth().getUserByEmail(email);
  } catch (error) {
    // Create user in Firebase if not exists
    userRecord = await admin.auth().createUser({
      email,
      password, // Use the password the user provided
      displayName: user.fullname,
    });
    
    // Set custom claims based on user's role in database
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: user.role });
  }

  // 3) Create a custom token with role claim
  const customToken = await admin.auth().createCustomToken(userRecord.uid, { role: user.role });

  // 4) Exchange custom token for ID token
  try {
    const { data } = await axios.post(
      `${baseUrl}:signInWithCustomToken?key=${apiKey}`,
      { token: customToken, returnSecureToken: true }
    );

    // Return the ID token for the client to use
    return data.idToken;
  } catch (error) {
    console.error('Error exchanging custom token:', error.response?.data || error.message);
    throw Object.assign(new Error('Authentication failed'), { status: 500 });
  }
};