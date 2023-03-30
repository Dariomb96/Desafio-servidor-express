import express from 'express';
import { signUp, renderSignUp } from '../controllers/signupController.js';

const signupRouter = express.Router();

signupRouter.get("/", renderSignUp);
signupRouter.post("/", signUp);

export { signupRouter };