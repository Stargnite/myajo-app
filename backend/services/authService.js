const admin = require('../config/firebase');
const axios = require('axios');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const emulatorHost = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const apiKey = process.env.EMULATOR_API_KEY;
const baseUrl = `http://${emulatorHost}/identitytoolkit.googleapis.com/v1/accounts`;

exports.register = async ({ fullName, email, password, role = 'member' }) => {
  // Hash password for our DB
  const passwordHash = await bcrypt.hash(password, 10);
  // Create user in Postgres
  await userModel.createUser({ fullname: fullName, email, passwordHash, role });
  // Create user in Firebase Auth emulator
  const userRecord = await admin.auth().createUser({ email, password, displayName: fullName });
  await admin.auth().setCustomUserClaims(userRecord.uid, { role });
  // Issue custom token
  return admin.auth().createCustomToken(userRecord.uid, { role });
};

exports.login = async ({ email, password }) => {
  // Verify password against our DB
  const user = await userModel.findUserByEmail(email);
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  // Sign in with Firebase emulator
  const { data } = await axios.post(
    `${baseUrl}:signInWithPassword?key=${apiKey}`,
    { email, password, returnSecureToken: true }
  );
  return data.idToken;
};
