const express = require("express");
const { register } = require("../../controllers/authController");
const { userValidation } = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", userValidation, register);

module.exports = router;
