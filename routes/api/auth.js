const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  updateAvatar,
} = require("../../controllers/authController");
const { userValidation } = require("../../middlewares/validationMiddleware");
const { authenticate } = require("../../middlewares/authenticate");
const { upload } = require("../../middlewares/upload");

const router = express.Router();

router.patch("/", authenticate, subscription);
router.post("/register", userValidation, register);
router.post("/login", userValidation, login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
