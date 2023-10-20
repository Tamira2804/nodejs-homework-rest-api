const contactsOperations = require("../../service/contactsDataOperations");
const requestError = require("../../helpers/requestError");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactRemoved = await contactsOperations.removeContact(contactId);
  if (!contactRemoved) {
    throw requestError(404, "Contact not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = removeContact;
