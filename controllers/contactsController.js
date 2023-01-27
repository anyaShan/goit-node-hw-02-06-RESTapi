const { controllerWrapper, HttpError } = require("../helpers/index");
const { Contact } = require("../models/contacts");

const getContacts = async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    status: "success",
    code: 200,
    contacts,
  });
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    contact,
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);

  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      contact,
    },
  });
};

const postContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact,
    },
  });
};

const putContact = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  postContact: controllerWrapper(postContact),
  putContact: controllerWrapper(putContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
