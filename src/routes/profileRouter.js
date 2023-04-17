import express from 'express';
import { getProfilePage } from '../controllers/profile.controller.js';

const profileRouter = express.Router();

profileRouter.get("/", getProfilePage);

export { profileRouter };