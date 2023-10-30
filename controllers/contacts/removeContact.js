const { Contact } = require("../../models/contactModel");
const { requestError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactRemoved = await Contact.findByIdAndRemove({ _id: contactId });
  if (!contactRemoved) {
    throw requestError(404, "Contact not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = removeContact;
