const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_RASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "anya.shanaida@meta.ua",
    pass: META_RASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmailNodemailer = async (data) => {
  const email = { ...data, from: "anya.shanaida@meta.ua" };

  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmailNodemailer;
