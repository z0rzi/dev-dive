import express from "express";
import { UserController } from "./userController";
import { checkOperationAllowed } from "./middlewares";

const router = express.Router();

const controller = new UserController();

router
  .route("/users")
  .get(checkOperationAllowed, controller.getAllUsers.bind(controller))
  .post(checkOperationAllowed, controller.createUser.bind(controller));

router
  .route("/users/:id(\\d+)")
  .get(checkOperationAllowed, controller.getUserById.bind(controller))
  .delete(checkOperationAllowed, controller.deleteUser.bind(controller))
  .put(checkOperationAllowed, controller.updateUser.bind(controller));

export default router;
