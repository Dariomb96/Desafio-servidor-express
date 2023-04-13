import express from 'express';
import { signUp, renderSignUp } from '../controllers/signup.controller.js';

const signupRouter = express.Router();

signupRouter.get("/", renderSignUp);
signupRouter.post("/", signUp);

export { signupRouter };