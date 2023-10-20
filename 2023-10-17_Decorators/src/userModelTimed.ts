import UserModel, { User } from "./userModel";

export class UserModelTimed extends UserModel {
  public constructor(private userModel: UserModel) {
    super();
  }

  getAllUsers(): User[] {
    console.time("getAllUsers");
    const users = this.userModel.getAllUsers();
    console.timeEnd("getAllUsers");
    return users;
  }

  getUserById(id: number): User | undefined {
    console.time("getUserById");
    const user = this.userModel.getUserById(id);
    console.timeEnd("getUserById");
    return user;
  }

  createUser(name: string, age: number, email: string, password: string): User | undefined {
    console.time("createUser");
    const newUser = this.userModel.createUser(name, age, email, password);
    console.timeEnd("createUser");
    return newUser;
  }

  removeUser(id: number): void {
    console.time("removeUser");
    this.userModel.removeUser(id);
    console.timeEnd("removeUser");
  }

  updateUser(id: number, user: Partial<User>): User | undefined {
    console.time("updateUser");
    const updatedUser = this.userModel.updateUser(id, user);
    console.timeEnd("updateUser");
    return updatedUser;
  }
}
