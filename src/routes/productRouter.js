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
    const productoAgregado = productos.find(e => e.code == req.body.code);
    manager.addProduct(req.body);
    productoAgregado == null ? res.status(200).send('producto agregado') : res.status(400).send("Bad request")
});

productRouter.put('/:pid', (req, res) => {
    manager.updateProduct(Number(req.params.pid), req.body)
    if (res.status(200)) {
        res.send('Producto Actualizado');
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