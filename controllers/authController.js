const dcrypt = require("bcryptjs");
const { controllerWrapper, HttpError } = require("../helpers/index");
const { User } = require("../models/users");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await dcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      password: newUser.password,
      email: newUser.email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await dcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = "82y2uhr3kj2kjh25hk2532";

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

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
};
