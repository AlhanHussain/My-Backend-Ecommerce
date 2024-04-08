const jwt = require('jsonwebtoken');

// JWT authentication middleware
exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  console.log('Token:', token); // Log token value
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }
  try {
    console.log('JWT Secret:', process.env.JWT_SECRET); // Log JWT secret
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Log decoded token
    req.user = decoded;
    console.log('User:', req.user); // Log user object

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// authMiddleware.js

// Superadmin authorization middleware
exports.superadminOnly = (req, res, next) => {
  console.log('User Role:', req.user.role); // Log user role

    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  };



  