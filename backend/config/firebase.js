const admin = require('firebase-admin');

// When using emulator, Admin SDK picks up FIREBASE_AUTH_EMULATOR_HOST
admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || ' bolanleajoapp-34371'
  });
module.exports = admin;