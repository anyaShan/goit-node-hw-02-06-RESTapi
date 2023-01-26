const {
  getContacts,
  getOneContact,
  deleteContact,
  postContact,
  putContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

const {
  postValidation,
  favoriteValidation,
} = require("../../middlewares/validationMiddleware");
const express = require("express");

const router = express.Router();

router.get("/", getContacts);
router.get("/:id", getOneContact);
router.delete("/:id", deleteContact);
router.post("/", postValidation, postContact);

router.put("/:id", postValidation, putContact);
router.patch("/:id/favorite", favoriteValidation, updateStatusContact);
module.exports = router;
