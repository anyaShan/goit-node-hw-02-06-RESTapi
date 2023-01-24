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
  res.status(200).json({
    status: "success",
    code: 200,
    contacts,
  });
});

router.get("/:id", async (req, res, next) => {
  const contact = await getContactById(req.params.id);

  if (!contact) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    contact,
  });
});

router.delete("/:id", async (req, res, next) => {
  const contact = await removeContact(req.params.id);
  console.log(contact);
  if (!contact) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      contact,
    },
  });
});

router.post("/", async (req, res, next) => {
  const contact = await addContact(req.body);
  res.status(201).json({
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

  if (!req.body) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
});

module.exports = router;
