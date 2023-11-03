const { User } = require("../../models/userModel");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
  const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  jimp
    .read(resultUpload)
    .then((image) => {
      image.resize(250, 250).write(resultUpload);
    })
    .catch((error) => {
      console.log(error);
    });

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
