const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/authController");
const { userValidation } = require("../../middlewares/validationMiddleware");
const { authenticate } = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/register", userValidation, register);
router.post("/login", userValidation, login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);

module.exports = router;
