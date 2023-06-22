import express from 'express';
import { sendEmail } from '../controllers/mailing.controller.js';

const mailingRouter = express.Router();

mailingRouter.get('/', sendEmail);

export { mailingRouter };
