const Contact = require("../../models/contactModel");
const requestError = require("../../helpers/requestError");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    throw requestError(404, "Contact not found");
  }
  console.log(updatedContact);
  res.status(200).json(updatedContact);
};

module.exports = updateContact;
