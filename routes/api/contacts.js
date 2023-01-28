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
const { authenticate } = require("../../middlewares/authenticate");
const express = require("express");

const router = express.Router();

router.use(authenticate);

router.get("/", getContacts);
router.get("/:id", getOneContact);
router.delete("/:id", deleteContact);
router.post("/", postValidation, postContact);

router.put("/:id", postValidation, putContact);
router.patch(
  "/:id/favorite",
  authenticate,
  favoriteValidation,
  updateStatusContact
);

module.exports = router;
