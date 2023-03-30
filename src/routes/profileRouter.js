import express from 'express';
import { getProfilePage } from '../controllers/profileController.js';

const profileRouter = express.Router();

profileRouter.get("/", getProfilePage);

export default { profileRouter };