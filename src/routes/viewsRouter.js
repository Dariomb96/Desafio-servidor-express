import express from 'express';
import { getProducts } from '../controllers/products.controller.js';

const viewsRouter = express.Router();

viewsRouter.get('/products', getProducts);

export default viewsRouter;
