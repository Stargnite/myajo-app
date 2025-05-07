const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const token = await authService.register(req.body);
    res.status(201).json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};
