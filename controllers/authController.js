const { controllerWrapper, HttpError } = require("../helpers/index");
const { User } = require("../models/users");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      password: newUser.password,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: controllerWrapper(register),
};
