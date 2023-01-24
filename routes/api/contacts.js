const { NotFound } = require("http-errors");
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
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    contacts,
  });
});

router.get("/:id", async (req, res, next) => {
  const contact = await getContactById(req.params.id);
  res.json({
    status: "success",
    code: 200,
    contact,
  });
});

router.delete("/:id", async (req, res, next) => {
  const contact = await removeContact(req.params.id);
  console.log(contact);
  if (!contact) {
    throw new NotFound(`Contacts whit id=${req.params.id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "product deleted",
    data: {
      contact,
    },
  });
});

router.post("/", async (req, res, next) => {
  const contact = await addContact(req.body);
  res.json({
    status: "success",
    code: 201,
    data: {
      contact,
    },
  });
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  const contact = await updateContact(id, req.body);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
});

module.exports = router;
