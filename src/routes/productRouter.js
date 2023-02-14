const express = require('express');
const productRouter = express.Router();
const ProductManager = require('../ProductManager.js');
let manager = new ProductManager('./products.json');
const productos = manager.getProducts();

productRouter.get('/', (req, res) => {
    console.log(productos);
    const limite = req.query.limite;
    if (limite && !isNaN(Number(limite))) {
        const productosConLimite = productos.slice(0, limite);
        res.send(productosConLimite);
    } else {
        res.send(productos);
    }
});

productRouter.get('/:pid', (req, res) => {
    const producto = (productos.find(e => e.id == Number(req.params.pid)));
    if (producto == null) {
        const errorNoProducto = `
        <html>  
            <body>
                <h1 style="color: red;">Error: id no existente</h1>
            </body>
        </html>`;
        res.send(errorNoProducto);
    } else {
        res.send(producto)
    }
});

productRouter.post('/', (req, res) => {
    console.log(req.body)
    const productoExistente = productos.find(e => e.code === req.body.code);
    if (productoExistente) {
        res.status(409).send('Conflict: Product with that code already exists');
    } else {
        manager.addProduct(req.body);
        res.status(201).send('Product Added');
    }
});

productRouter.put('/:pid', (req, res) => {
    const id = Number(req.params.pid);
    const product = req.body;
    const updatedProduct = manager.updateProduct(id, product);
    if (updatedProduct) {
        res.status(200).send('Producto Actualizado');
    } else {
        res.status(400).send('Bad request');
    }
});

productRouter.delete('/:pid', (req, res) => {
    const producto = (productos.find(e => e.id == Number(req.params.pid)))
    manager.deleteProduct(req.params.pid)
    if (producto == null) {
        res.send('producto eliminado del carrito')
    } else { res.status(400).send('Bad request') }
});

module.exports = {
    productRouter,
}