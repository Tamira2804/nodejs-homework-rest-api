const express = require("express");
const contacts = require("../../models/contacts");
const requestError = require("../../helpers/requestError");
const Joi = require("joi");

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
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      throw requestError(404, "Contact not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validationError = requiredSchema.validate(req.body);
    if (validationError) {
      throw requestError(400, validationError.message);
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactRemoved = await contacts.removeContact(contactId);
    if (!contactRemoved) {
      throw requestError(404, "Contact not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const validationError = optionalSchema.validate(req.body);
    if (validationError) {
      throw requestError(400, validationError.message);
    }
    const updatedContact = await contacts.updateContact(contactId, req.body);
    if (!updatedContact) {
      throw requestError(404, "Contact not found");
    }
    console.log(updatedContact);
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
