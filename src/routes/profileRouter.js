import express from 'express';
import { getProfilePage } from '../controllers/profile.controller.js';
import passport from 'passport';
const auth = passport.authenticate("jwt", { session: false })

const profileRouter = express.Router();

profileRouter.get("/",auth, getProfilePage);

export { profileRouter };