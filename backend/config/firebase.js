const admin = require('firebase-admin');

// When using emulator, Admin SDK picks up FIREBASE_AUTH_EMULATOR_HOST
admin.initializeApp();
module.exports = admin;