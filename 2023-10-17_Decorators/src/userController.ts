import type { Response } from "express";
import { RequestWithUser } from "./middlewares";
import UserModel, { User } from "./userModel";

export class UserController {
  model: UserModel;

  constructor() {
    this.model = UserModel.getInstance();
  }

  getAllUsers(_req: RequestWithUser, res: Response) {
    const allUsers = this.model.getAllUsers();
    res.status(200).send(allUsers);
  }

  getUserById(req: RequestWithUser, res: Response) {
    if (!req.params.id) {
      res.status(400).send("Missing user id");
    }

    const id: number = +req.params.id;

    const user = this.model.getUserById(id);

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(user);
    }
  }

  createUser(req: RequestWithUser, res: Response) {
    const { name, age, email, password } = req.body;

    const user = this.model.createUser(name, age, email, password);

    res.status(201).send(user);
  }

  updateUser(req: RequestWithUser, res: Response) {
    const newUser = req.body as Partial<User>;

    const id = +req.params.id;

    const user = this.model.updateUser(id, newUser);

    if (!user) {
      res.status(404).send("User not found");
    }

    res.status(200).send(user);
  }

  deleteUser(req: RequestWithUser, res: Response) {
    const id = +req.params.id;

    this.model.removeUser(id);

    res.status(200).send("User deleted");
  }
}
