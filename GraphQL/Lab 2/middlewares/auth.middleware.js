const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    req.isAuthenticated = false;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.isAuthenticated = true;
  } catch (err) {
    req.user = null;
    req.isAuthenticated = false;
  }

  next();
};

module.exports = authenticate;
