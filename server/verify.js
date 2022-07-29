const jwt = require("jsonwebtoken");
// const config = require("auth-token")

module.exports = async function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({ mssg: "no token found", status: 1 });
  try {
    const verify = await jwt.verify(token, "Secret5399");
    req.user = verify;
    next();
  } catch (err) {
    return res.status(401).json({ mssg: "invalid token", status: 1 });
  }
};
