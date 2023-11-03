const { ctrlWrapper } = require("../../helpers");
const listContacts = require("./listContacts");
const getFavorite = require("./getFavorite");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getFavorite: ctrlWrapper(getFavorite),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
