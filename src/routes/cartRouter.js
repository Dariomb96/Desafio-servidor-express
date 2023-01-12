const express = require('express');
const ProductManager = require('../ProductManager');
let cartManager = new ProductManager('./cart.json');
const cart = cartManager.getProducts();
const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
    res.send(cart)
})

cartRouter.get('/:cid', (req, res) => {
    const producto = (cart.find(e => e.id == Number(req.params.cid)));
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

cartRouter.post('/', (req, res) => {
    const highestId = Math.max(...cart.map(e => e.id));
    let idCart = highestId;
    idCart++;
    const newCart = {
        id: idCart,
        products: (cart.map(
            producto => {
                id = producto.id,
                    quantity = 0
                return { id, quantity }
            }))
    }
    cart.push(newCart);
    res.send('Carrito creado con exito')
});

cartRouter.post('/:cid/product/:pid', (req, res) => {
    const carrito = (cart.find(e => e.id == Number(req.params.cid)));
    const producto = (carrito.products.find(e => e.id == Number(req.params.pid)));
    if (producto) {
        producto.quantity++;
        console.log(producto);
        res.send('Producto actualizado')
    } else {
        const producto = {
            id: Number(req.params.pid),
            quantity: 0,
        }
        carrito.products.push(producto);
        res.send('Producto agregado')
    }
    
})

module.exports = {
    cartRouter,
}