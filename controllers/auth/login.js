const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const requestError = require("../../helpers/requestError");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, "Email is not valid");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw requestError(401, "Password is not valid");
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ token });
};

module.exports = login;
