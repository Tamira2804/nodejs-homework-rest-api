const { requestError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(requestError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      next(requestError(401));
    }
    req.user = user;
    next();
  } catch {
    next(requestError(401));
  }
};

module.exports = authenticate;
