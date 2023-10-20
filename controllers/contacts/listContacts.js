const contactsOperations = require("../../service/contactsDataOperations");

const listContacts = async (req, res, next) => {
  const allContacts = await contactsOperations.listContacts();
  res.status(200).json(allContacts);
};

module.exports = listContacts;
