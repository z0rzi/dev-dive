import express from "express";
import { UserController } from "./userController";

const router = express.Router();

const controller = new UserController();

router
  .route("/users")
  .get(controller.getAllUsers.bind(controller))
  .post(controller.createUser.bind(controller));

router
  .route("/users/:id(\\d+)")
  .get(controller.getUserById.bind(controller))
  .delete(controller.deleteUser.bind(controller))
  .put(controller.updateUser.bind(controller));

export default router;
