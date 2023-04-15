import express from "express";
import validate from "../../middlewares/validate";
import authValidation from "../../validations/auth.validation";
import authController from "../../controllers/auth.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);
router.get("/user", auth(), authController.getAuthUser);

router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  "/change-password",
  auth(),
  validate(authValidation.changePassword),
  authController.changePassword
);
router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);
router.post(
  "/send-verification-email",
  auth(),
  authController.sendVerificationEmail
);
router.post(
  "/verify-email",
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);

export default router;