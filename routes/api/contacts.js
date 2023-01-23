const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const allContacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    allContacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const oneContact = await getContactById(req.params.id);
  res.json({
    status: "success",
    code: 200,
    data: {
      oneContact,
    },
  });
});

router.post("/", async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
