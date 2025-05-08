const userService = require('../services/userService');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

// Get current user profile
exports.getMe = async (req, res, next) => {
  try {
    // User data is already attached to the request by the auth middleware
    const { uid, email, role } = req.user;
    
    // to fetch additional user data from your database if needed
    // const userData = await userService.getUserByEmail(email);
    
    res.json({ 
      success: true, 
      user: {
        uid,
        email,
        role
      }
    });
  } catch (err) {
    next(err);
  }
};