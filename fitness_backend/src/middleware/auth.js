const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'myultrasecret';

// PUBLIC_INTERFACE
function authenticateToken(req, res, next) {
  /** Middleware: verifies JWT, attaches userId to req.user. */
  const auth = req.headers['authorization'];
  const token = auth && auth.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid/expired token' });
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
