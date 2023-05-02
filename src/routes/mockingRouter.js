import express from 'express';
import { generateMockProducts } from '../controllers/mocking.controller.js';

const mockingRouter = express.Router();

mockingRouter.get('/', generateMockProducts);

export {mockingRouter};