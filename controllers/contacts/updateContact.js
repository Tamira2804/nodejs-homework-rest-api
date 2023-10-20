const contactsOperations = require("../../service/contactsDataOperations");
const requestError = require("../../helpers/requestError");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contactsOperations.updateContact(
    contactId,
    req.body
  );
  if (!updatedContact) {
    throw requestError(404, "Contact not found");
  }
  console.log(updatedContact);
  res.status(200).json(updatedContact);
};

module.exports = updateContact;
