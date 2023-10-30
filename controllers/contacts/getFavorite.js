const { Contact } = require("../../models/contactModel");

const getFavorite = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const favoriteContacts = await Contact.find(
    { owner, favorite: true },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");
  res.status(200).json(favoriteContacts);
};

module.exports = getFavorite;
