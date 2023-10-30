const { Contact } = require("../../models/contactModel");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const allContacts = await Contact.find(
    { owner },
    "-createdAt -updatedAt"
  ).populate("owner", "name email");
  res.status(200).json(allContacts);
};

module.exports = listContacts;
