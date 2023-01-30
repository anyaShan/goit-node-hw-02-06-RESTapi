const dcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const { controllerWrapper, HttpError } = require("../helpers/index");
const { User } = require("../models/users");
// const sendEmail = require("../services/email/sendEmail");
const sendEmailNodemailer = require("../services/email/sendEmailNodemaier");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await dcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    text: "and easy to do anywhere, even with Node.js",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  // await sendEmail(verifyEmail);
  await sendEmailNodemailer(verifyEmail);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      password: newUser.password,
      email: newUser.email,
    },
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

const verifySecond = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (!email) {
    throw HttpError(400, "missing required field email");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Repeat verify email",
    text: "and easy to do anywhere, even with Node.js",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  // await sendEmail(verifyEmail);
  await sendEmailNodemailer(verifyEmail);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.verify) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await dcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2 days" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    status: "success",
    code: 200,
    user: {
      token,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    status: "success",
    code: 200,
    user: {
      email,
      subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout succes",
  });
};

const subscription = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!user) {
    throw HttpError(404);
  }

  res.json({ user });
};

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const newFileName = `${_id}_${filename}`;

  const resultUpload = path.join(avatarDir, newFileName);
  await fs.rename(tempUpload, resultUpload);

  console.log(resultUpload);

  Jimp.read(resultUpload, (err, img) => {
    if (err) throw err;
    img.resize(250, 250).write(resultUpload);
  });

  const avatarURL = path.join("avatars", newFileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    status: "success",
    code: 200,
    avatarURL,
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  subscription: controllerWrapper(subscription),
  updateAvatar: controllerWrapper(updateAvatar),
  verify: controllerWrapper(verify),
  verifySecond: controllerWrapper(verifySecond),
};
