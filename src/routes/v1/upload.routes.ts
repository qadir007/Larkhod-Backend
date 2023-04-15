import express from "express";
import { uploadController } from "../../controllers";
import validate from "../../middlewares/validate";
import { uploadValidation } from "../../validations";

const router = express.Router();

router.post(
  "/",
  validate(uploadValidation.fileMeta),
  uploadController.getFileUploadUrl
);

export default router;