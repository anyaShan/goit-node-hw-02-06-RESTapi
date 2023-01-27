const express = require("express");
const { register, login } = require("../../controllers/authController");
const { userValidation } = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", userValidation, register);
router.post("/login", userValidation, login);

module.exports = router;
