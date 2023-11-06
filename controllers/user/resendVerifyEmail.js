const { User } = require("../../models/userModel");
const { requestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, "Email not found");
  }
  if (user.verify) {
    throw requestError(401, "Email already verified");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<h1>Hello ${user.name}</h1>
        <p>Please verify your email by clicking on the link below</p>
        <a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}"> Verify </a>
        <p>If you did not request this, please ignore this email</p>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Verify email send successfully" });
};

module.exports = resendVerifyEmail;
