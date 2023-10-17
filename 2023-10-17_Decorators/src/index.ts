// 
// Create a decorator factory which will check the body elements:
//   @BodyHas('age', 'number')
//
// Create a decorator factory which will check that the body contains the right elements
//   @BodyHasNoMoreThan('age', 'name', 'email')
//
// Create a decorator which will make sure the user is an admin:
//   @isAdmin
//
// Create a class decorator which will log to a file the functions that have been used.
//
// Create another class decorator, to time the execution of each function.
//

import express from 'express';

import {addUserToRequest} from './middlewares';
import userRoutes from './userRoutes';

const app = express();

app.use(express.json());

app.use(addUserToRequest);
app.use(userRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
