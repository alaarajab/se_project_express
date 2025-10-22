const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_STATUS_CODE } = require("../utils/constants");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  // Extract the Authorization header
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET); // Verify token
    req.user = payload; // Attach payload to request object
    next(); // Continue to next middleware / route
  } catch (err) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .send({ message: "Invalid or expired token" });
  }
};
