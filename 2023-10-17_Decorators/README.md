# Higher order functions and the decorator Pattern in JavaScript

This week, we're going to talk about Higher order functions and the decorator Pattern!

Higher-order functions are your programming Swiss Army knives. They can take in, manipulate, and return functions, making your code more adaptable and expressive. The decorator pattern uses this concept to enhance objects' functionality without altering their core structure.

Together, these concepts empower you to create versatile and modular code. These are great tools for code modularity and flexibility.

🔗 **Study links :**

- Higher Order Functions in JavaScript – Beginner's Guide
  https://www.freecodecamp.org/news/higher-order-functions-in-javascript/

- The decorator pattern - general concept
  https://refactoring.guru/design-patterns/decorator

- The decorator pattern - applied to JavaScript
  https://blog.logrocket.com/understanding-javascript-decorators/

- For visual learners
  https://www.youtube.com/watch?v=GCraGHx6gso (54 mins)
  https://www.youtube.com/watch?v=v6tpISNjHf8 (12 mins)

## Kata

You are provided with a simple back-end for managing users.

The code follows the MVC pattern, and is mainly divided in 3 files:
- `userRoutes` - Where the routes are defined
- `userController` - Where the client input is verified and parsed
- `userModel` - Where the Database is accessed


To start the application :
```bash
npm i
npm run build
npm run start
```

To test your app, you can use a client, like Postman, or use directly curl:
```bash
curl -X GET -H "user-id: 3" http://localhost:3000/users/2
curl -X POST -H "user-id: 3" -H "Content-Type: application/json" -d '{"name": "Orlando Blum", "age": 49, "email": "orlando@blum.com", "password": "NotAPassword"}' http://localhost:3000/users
```


**Your are only allowed to change the code in the userController file** (and to add new files/classes if necessary)

The problem with the current application is :
- The identity of the user using the API is not verified
- The provided body is not verified

Additionally, we would like to add the option to monitor the database access in 2 ways:
- Log to a file the used functions of the model
- Display the average execution time of each function when it is used


Use constructors to solve these issues and add these features.


### A little help

Here is a suggested course of actions if you don't know where to begin:


- Create a decorator factory which will check the body elements:

  ```typescript
    @BodyHas('age', 'number')
  ```

- Create a decorator factory which will check that the body contains the right elements, and nothing more

  ```
    @BodyHasNoMoreThan('age', 'name', 'email')
  ```

- Create a decorator which will make sure the user is authorized to run this accion:
  (Admin can do anything, and non-admins can only access their own profile)

  ```typescript
    @isAuthorized
  ```

- Create a class decorator which will log to a file the functions that have been used.

  ```typescript
  class UserModelWithTrace extends UserModel {
  ```

- Create another class decorator, to time the execution of each function, and log it to the console.

  ```typescript
  class UserModelWithTime extends UserModel {
  ```

### Handbook

Here is one handy way to write a decorator in typescript:
```typescript
function MyDecorator(
    target: any,
    propertyKey: string | Symbol,
    descriptor: PropertyDescriptor
) {
    console.log('This evauates when the class is loaded in memory');
    let originalMethod = descriptor.value;

    descriptor.value = function() {
        console.log('Function is about to run...');
        originalMethod(...arguments);
        console.log('Function did run.');
    }
}

class MyClass {
  @MyDecorator
  method() {}
}
```

For decorator factories, you can head over to https://www.typescriptlang.org/docs/handbook/decorators.html for extra documentation.
