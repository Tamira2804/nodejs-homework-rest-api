const { ctrlWrapper } = require("../../helpers");
const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const getAvatar = require("./getAvatar");
const updateAvatar = require("./updateAvatar");

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  getAvatar: ctrlWrapper(getAvatar),
  updateAvatar: ctrlWrapper(updateAvatar),
};
