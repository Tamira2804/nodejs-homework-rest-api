const { User } = require("../../models/userModel");
const { requestError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findById(_id);
  if (!user) {
    throw requestError(404, "User is nit find");
  }

  user.subscription = subscription;
  await user.save();

  res.json({ message: "Update subscription success", user });
};

module.exports = updateSubscription;
