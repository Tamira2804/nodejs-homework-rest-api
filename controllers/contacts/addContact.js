const contactsOperations = require("../../service/contactsDataOperations");

const addContact = async (req, res, next) => {
  const newContact = await contactsOperations.addContact(req.body);
  res.status(201).json(newContact);
};

module.exports = addContact;
