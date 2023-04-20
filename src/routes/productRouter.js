import express from 'express';
import { getProducts, createProduct } from '../controllers/product.controller.js';
import { checkUserRole } from '../utils.js';
const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('',checkUserRole('admin'), createProduct);

export {productRouter};