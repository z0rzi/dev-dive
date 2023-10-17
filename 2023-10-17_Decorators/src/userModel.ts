import USERS from "./users.json";

export interface User {
  id: number;
  name: string;
  age: number;
  isAdmin: boolean;
  email: string;
  password: string;
  dateCreated: string;
}

export default class UserModel {
  private static instance: UserModel;

  /**
   * @returns The instance for this Singleton
   */
  public static getInstance(): UserModel {
    if (!UserModel.instance) {
      UserModel.instance = new UserModel();
    }
    return UserModel.instance;
  }

  /**
   * All the user of the "Database"
   */
  private users: User[] = [...USERS];

  private constructor() {}

  /**
   * @returns All the users of the Database
   */
  getAllUsers(): User[] {
    return this.users;
  }

  /**
   * @param id The id of the user to get
   *
   * @returns The user with the given id. Undefined if no user has this id.
   */
  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  /**
   * Creates a new user and adds it to the database
   *
   * @param name The name of the user
   * @param age The age of the user
   * @param email The email of the user
   * @param password The password of the user
   *
   * @returns The newly created user
   */
  createUser(name: string, age: number, email: string, password: string): User | undefined {
    let userId = 1;

    // Finding a valid ID for the new user
    const allIds = this.users.map((user) => user.id);
    while (allIds.includes(userId)) {
      userId++;
    }

    // Creating the user
    const newUser: User = {
      id: userId,
      name,
      age,
      email,
      password,
      isAdmin: false,
      dateCreated: new Date().toISOString(),
    };

    // Adding the new user to the "Database"
    this.users.push(newUser);

    return newUser;
  }

  /**
   * Removes a user from the database
   *
   * @param id The id of the user to remove
   */
  removeUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  /**
   * Updates a user in the database
   *
   * @param id The id of the user to update
   * @param user The new user data. Can be partial.
   */
  updateUser(id: number, user: Partial<User>): User | undefined {
    const userToUpdate = this.getUserById(id);

    if (!userToUpdate) {
      return;
    }

    const { name, age, email, password } = user;

    const updatedUser: User = { ... userToUpdate }

    if (name) updatedUser.name = name;
    if (age) updatedUser.age = age;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;

    this.removeUser(id);
    this.users.push(updatedUser);

    return updatedUser;
  }
}
