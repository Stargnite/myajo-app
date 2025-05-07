const express = require('express');
const rateLimit = require('express-rate-limit');
const { validateRegister, validateLogin, handleValidationErrors } = require('../validation/authValidation');
const authController = require('../controllers/authController');

// Rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many requests, please try again later.',
});

const router = express.Router();
router.use(authLimiter);

// Register route
router.post(
  '/register',
  validateRegister,
  handleValidationErrors,
  authController.register
);

// Login route
router.post(
  '/login',
  validateLogin,
  handleValidationErrors,
  authController.login
);

module.exports = router;
