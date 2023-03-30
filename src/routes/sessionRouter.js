import express from 'express';
import { githubAuth, githubAuthCallback } from '../controllers/session.js';

const sessionRouter = express.Router();

sessionRouter.get('/github', githubAuth);
sessionRouter.get('/githubcallback', githubAuthCallback);

export { sessionRouter };