import express from 'express';
import { getProducts } from '../controllers/product.controller.js';

const viewsRouter = express.Router();

viewsRouter.get('/products', getProducts);

export {viewsRouter};
