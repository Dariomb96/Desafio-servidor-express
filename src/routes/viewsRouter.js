import express from 'express';
import { getProductsController } from '../controllers/product.controller.js';

const viewsRouter = express.Router();

viewsRouter.get('/products', getProductsController);

export {viewsRouter};
