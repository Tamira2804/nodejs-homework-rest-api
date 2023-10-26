const User = require("../../models/userModel");
const requestError = require("../../helpers/requestError");
const bcrypt = require("bcrypt");

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw requestError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  res
    .status(201)
    .json({
      id: newUser.id,
      email: newUser.email,
      subscription: newUser.subscription,
    });
};

module.exports = registration;
