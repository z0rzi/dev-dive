import { NextFunction, Request, Response } from 'express';
import UserModel, { User } from './userModel';

export type RequestWithUser = Request & { user: User };

/**
 * Adds the user to the request if `headers['user-id']` is set. Otherwise,
 * responds to the client with a 401.
 */
export function addUserToRequest(req: RequestWithUser, res: Response, next: NextFunction) {
    // Obviously not a secure solution at all to put the user id in the
    // headers, but security is not the focus of the exercise.
    const userId = req.headers['user-id'];

    if (userId == undefined || isNaN(+userId)) {
        // Unauthorized
        res.status(401).send('Unauthorized, user id missing or invalid');
        return;
    }

    const model = UserModel.getInstance();
    const user = model.getUserById(+userId);

    if (!user) {
        // No user has this id
        res.status(401).send('Unauthorized, missing user id');
        return;
    }

    next();
}
