import UserModel, { User } from "./userModel";
import fs from 'fs';

const LOG_FILE = "/tmp/decorators.log";

export class UserModelLogged extends UserModel {
  public constructor(private userModel: UserModel) {
    super();
    this.writeLog('INIT APP')
  }

  private writeLog(message: string): void {
    fs.appendFileSync(LOG_FILE, `${new Date().toISOString()} - ${message}\n`);
  }

  getAllUsers(): User[] {
    this.writeLog("getAllUsers");
    return this.userModel.getAllUsers();
  }

  getUserById(id: number): User | undefined {
    this.writeLog("getUserById");
    return this.userModel.getUserById(id);
  }

  createUser(
    name: string,
    age: number,
    email: string,
    password: string
  ): User | undefined {
    this.writeLog("createUser");
    return this.userModel.createUser(name, age, email, password);
  }

  removeUser(id: number): void {
    this.writeLog("removeUser");
    this.userModel.removeUser(id);
  }

  updateUser(id: number, user: Partial<User>): User | undefined {
    this.writeLog("updateUser");
    return this.userModel.updateUser(id, user);
  }
}
