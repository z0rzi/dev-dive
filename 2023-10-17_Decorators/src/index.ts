import express from 'express';

import { addUserToRequest } from './middlewares';
import userRoutes from './userRoutes';

const app = express();

app.use(express.json());

app.use(addUserToRequest);

app.use(userRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
