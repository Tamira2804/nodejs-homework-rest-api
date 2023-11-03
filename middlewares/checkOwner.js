const { Contact } = require("../models/contactModel");
const { requestError } = require("../helpers");

const checkOwner = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw requestError(404, "Contact not found");
  }
  const ownerIdNormalized = contact.owner.toString();
  const userIdNormalised = userId.toString();

  if (ownerIdNormalized !== userIdNormalised) {
    throw requestError(403, "Access denied");
  }
  next();
};
module.exports = checkOwner;
