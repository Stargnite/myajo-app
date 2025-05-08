const admin = require('../config/firebase');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }
    
    const idToken = authHeader.split(' ')[1];
    
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Make user data available to route handlers
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || decodedToken.claims?.role || 'member'
    };
    
    // Log successful verification (useful for debugging)
    console.log(`User ${req.user.email} authenticated with role: ${req.user.role}`);
    
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};