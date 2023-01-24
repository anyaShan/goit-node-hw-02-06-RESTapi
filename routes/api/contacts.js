const {
  getContacts,
  getOneContact,
  deleteContact,
  postContact,
  putContact,
} = require("../../controllers/contactsController");

const { postValidation } = require("../../middlewares/validationMiddleware");
const express = require("express");

const router = express.Router();

router.get("/", getContacts);
router.get("/:id", getOneContact);
router.delete("/:id", deleteContact);
router.post("/", postValidation, postContact);

router.put("/:id", postValidation, putContact);

module.exports = router;
