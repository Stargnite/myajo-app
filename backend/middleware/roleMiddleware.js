/**
 * Middleware to check if the user has required role(s)
 * @param {string|string[]} roles - Required role(s) for access
 */
module.exports = (roles) => {
    // Convert single role to array
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    return (req, res, next) => {
      // Auth middleware should run first to set req.user
      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Authentication required' 
        });
      }
      
      // Check if user's role is in the allowed roles list
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied: insufficient permissions' 
        });
      }
      
      next();
    };
  };