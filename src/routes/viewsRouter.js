import express from 'express';
import { getProducts } from '../controllers/products';

const viewsRouter = express.Router();

viewsRouter.get('/products', getProducts);

export default viewsRouter;
