const express = require('express');
const viewsRouter = express.Router();
const ProductManager = require('../ProductManager.js');
let manager = new ProductManager('./products.json');
const productos = manager.getProducts();

viewsRouter.get('', (req, res) => {
    res.render('home', {productos});
});

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {productos});
});

module.exports = {
    viewsRouter,
}