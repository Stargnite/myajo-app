const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required'),
  body('email')
    .isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['agent', 'member']).withMessage('Role must be either agent or member'),
];

const validateLogin = [
  body('email')
    .isEmail().withMessage('Valid email is required'),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

const handleValidationErrors = (req, res, next) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  handleValidationErrors,
};
