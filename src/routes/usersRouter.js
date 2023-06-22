import express from 'express';
import { getUsersController, deleteUserController, deleteInactiveController, viewUsersController } from '../controllers/users.controller.js';
import passport from 'passport';
import { checkUserRole } from '../utils.js';

const usersRouter = express.Router();
const auth = passport.authenticate("jwt", { session: false })

usersRouter.get('/', getUsersController);
usersRouter.get('/manage',auth,checkUserRole('Admin'), viewUsersController)
usersRouter.post('/delete/',auth, deleteUserController);
usersRouter.post('/delete-inactive',auth, deleteInactiveController);

export {usersRouter}; 