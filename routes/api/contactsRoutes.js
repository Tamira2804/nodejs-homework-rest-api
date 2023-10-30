const express = require("express");
const { schemas } = require("../../models/contactModel");
const { isValidBody, isValidId, authenticate } = require("../../middlewares");
const {
  listContacts,
  getFavorite,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, listContacts);

router.get("/favorite", authenticate, getFavorite);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post("/", authenticate, isValidBody(schemas.requiredSchema), addContact);

router.delete("/:contactId", authenticate, isValidId, removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  isValidBody(schemas.optionalSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isValidBody(schemas.optionalSchema),
  updateFavorite
);

module.exports = router;
