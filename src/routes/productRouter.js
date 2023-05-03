import express from 'express';
import { getProductsController, createProductController } from '../controllers/product.controller.js';
import { checkUserRole } from '../utils.js';
const productRouter = express.Router();

productRouter.get('/', getProductsController);
productRouter.post('',checkUserRole('admin'), createProductController);

export {productRouter};