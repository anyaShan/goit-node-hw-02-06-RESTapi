const { NotFound } = require("http-errors");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact,
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

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  res.json({
    status: "success",
    code: 200,
    contact,
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

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  console.log(contact);
  if (!contact) {
    throw new NotFound(`Contacts whit id=${req.params.contactId} not found`);
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

// router.put("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;

//   const contact = await updateContact(contactId, req.body);

//   res.status(200).json({
//     status: "success",
//     code: 200,
//     data: {
//       contact,
//     },
//   });
// });

module.exports = router;
