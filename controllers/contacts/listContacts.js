const { Contact } = require("../../models/contactModel");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite, name, email } = req.query;
  const skip = (page - 1) * limit;
  const ownerQuery = { owner };

  if (favorite) {
    ownerQuery.favorite = favorite === "true";
  }
  if (name) {
    ownerQuery.name = { $regex: name, $options: "i" };
  }
  if (email) {
    ownerQuery.email = { $regex: email, $options: "i" };
  }

  const filteredContacts = await Contact.find(
    ownerQuery,
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");
  res.status(200).json(filteredContacts);
};

module.exports = listContacts;
