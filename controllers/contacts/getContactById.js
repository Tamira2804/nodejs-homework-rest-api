const contactsOperations = require("../../service/contactsDataOperations");
const requestError = require("../../helpers/requestError");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    throw requestError(404, "Contact not found");
  }
  res.status(200).json(contact);
};

module.exports = getContactById;
