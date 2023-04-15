import express from "express";
import userController from "../../controllers/user.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import userValidation from "../../validations/user.validation";

const router = express.Router();

router
  .route("/me")
  .put(auth(), validate(userValidation.updateMe), userController.updateMe);

router
  .route("/")
  .post(auth(), validate(userValidation.createUser), userController.createUser)
  .get(userController.getUsers);

router
  .route("/:id")
  .get(auth(), validate(userValidation.getUser), userController.getUser)
  .put(validate(userValidation.updateUser), userController.updateUser)
  .delete(
    auth(),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

export default router;
