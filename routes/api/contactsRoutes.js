const express = require("express");
const { schemas } = require("../../models/contactModel");
const { ctrlWrapper } = require("../../helpers");
const {
  isValidBody,
  isValidId,
  authenticate,
  checkOwner,
} = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/favorite", authenticate, ctrl.getFavorite);

router.get(
  "/:contactId",
  authenticate,
  ctrlWrapper(checkOwner),
  isValidId,
  ctrl.getContactById
);

router.post(
  "/",
  authenticate,
  isValidBody(schemas.requiredSchema),
  ctrl.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  ctrlWrapper(checkOwner),
  isValidId,
  ctrl.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  ctrlWrapper(checkOwner),
  isValidId,
  isValidBody(schemas.optionalSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  ctrlWrapper(checkOwner),
  isValidId,
  isValidBody(schemas.optionalSchema),
  ctrl.updateFavorite
);

module.exports = router;
