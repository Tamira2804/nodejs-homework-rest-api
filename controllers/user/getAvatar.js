const { User } = require("../../models/userModel");
const gravatar = require("gravatar");

async function getAvatar(req, res, next) {
  const { _id } = req.user;
  const { avatarURL, email } = await User.findById(_id);

  if (!avatarURL) {
    const gravatarURL = gravatar.url(email, { s: 250, protocol: "http" });
    await User.findByIdAndUpdate(_id, { avatarURL: gravatarURL });
    res.json({ avatarURL: gravatarURL });
    return;
  }

  res.json({ avatarURL });
}

module.exports = getAvatar;
