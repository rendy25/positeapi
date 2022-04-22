const jwt = require("jsonwebtoken");
const resResult = require("../utils/Response.Utils");

const config = process.env;

const verifyUser = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return resResult(403, "A token is required for authentication", res);
  }
  try {
    const decoded = jwt.verify(token, config.SECRET_KEY_USER);
    req.user = decoded;
  } catch (err) {
    return resResult(401, "Invalit token", res);
  }
  return next();
};

const verifyApp = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return resResult(
      403,
      "A token application is required for authentication",
      res
    );
  }

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return resResult(401, "Invalit token", res);
  }
  return next();
};

module.exports = { verifyUser, verifyApp };
