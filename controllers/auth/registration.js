const { User } = require("../../models/userModel");
const { requestError } = require("../../helpers");
const bcrypt = require("bcrypt");

const registration = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw requestError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    subscription,
  });

  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = registration;
