const express = require("express");
const Joi = require("joi");
const controllerWrap = require("../../helpers/controllerWrapper");
const validate = require("../../middlewares/validationMiddleware");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");

const router = express.Router();

const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

const requiredSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phonePattern).required(),
});
const optionalSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phonePattern),
  favorite: Joi.boolean(),
});

router.get("/", controllerWrap(listContacts));

router.get("/:contactId", controllerWrap(getContactById));

router.post("/", validate(requiredSchema), controllerWrap(addContact));

router.delete("/:contactId", controllerWrap(removeContact));

router.put(
  "/:contactId",
  validate(optionalSchema),
  controllerWrap(updateContact)
);

module.exports = router;
