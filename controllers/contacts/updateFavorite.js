const { Contact } = require("../../models/contactModel");
const { requestError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    throw requestError(400, "missing field favorite");
  }
  const updateStatusContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true }
  );
  if (!updateStatusContact) {
    throw requestError(404, "Contact not found");
  }
  console.log(updateStatusContact);
  res.status(200).json(updateStatusContact);
};

module.exports = updateFavorite;
