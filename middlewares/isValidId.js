const { isvalidObjectId } = require("mongoose");

const requestError = require("../helpers/requestError");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isvalidObjectId) {
    next(requestError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
