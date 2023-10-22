const Contact = require("../../models/contactModel");

const listContacts = async (req, res, next) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

module.exports = listContacts;
