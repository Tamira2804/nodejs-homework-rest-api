const express = require("express");
const {
  registration,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/auth");
const { schemas } = require("../../models/userModel");
const { isValidBody, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.post(
  "/registration",
  isValidBody(schemas.registerSchema),
  ctrlWrapper(registration)
);
router.post("/login", isValidBody(schemas.loginSchema), ctrlWrapper(login));

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.post("/logout", authenticate, ctrlWrapper(logout));

router.patch(
  "/users/:userId",
  authenticate,
  isValidBody(schemas.updateSchema),
  ctrlWrapper(updateSubscription)
);

module.exports = router;
