const express = require("express");
const user = require("../../controllers/user");
const { schemas } = require("../../models/userModel");
const { isValidBody, authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post(
  "/registration",
  isValidBody(schemas.registerSchema),
  user.registration
);

router.get("/verify/:verificationCode", user.verifyEmail);

router.post(
  "/verify",
  isValidBody(schemas.emailSchema),
  user.resendVerifyEmail
);

router.post("/login", isValidBody(schemas.loginSchema), user.login);

router.get("/current", authenticate, user.getCurrent);

router.post("/logout", authenticate, user.logout);

// router.patch(
//   "/:userId",
//   authenticate,
//   isValidBody(schemas.updateSchema),
//   user.updateSubscription
// );

router.get("/avatars", authenticate, user.getAvatar);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  user.updateAvatar
);

module.exports = router;
