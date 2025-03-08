const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No Authorization header, authorization denied' });
  }

  if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Invalid Authorization header format, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  console.log('Extracted Token:', token); // Debug: Print the extracted token

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assumes JWT_SECRET is in .env
    req.user = { id: decoded.userId }; // Use userId and store it in req.user.id
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err); // Log the verification error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;