require("dotenv").config();
const nodemailer = require("nodemailer");

const { META_MAIL, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_MAIL,
    pass: META_PASSWORD,
  },
  connectionTimeout: 25000,
  tls: {
    rejectUnauthorized: false, // Вимкнення перевірки сертифіката
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: META_MAIL };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
