const ProductManager = require('./ProductManager.js');
const express = require('express');
const app = express();
const port = 8080;
let manager = new ProductManager('./products.json');
let cart = [];
const productos = manager.getProducts();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/productos', (req, res) => {
    const limite = req.query.limite;
    if (limite && !isNaN(Number(limite))) {
        const productosConLimite = productos.slice(0, limite);
        res.send(productosConLimite);
    } else {
        res.send(productos);
    }
});

app.get('/productos/:id', (req, res) => {
    const producto = (productos.find(e => e.id == Number(req.params.id)));
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

app.post('/productos', (req, res) => {
    const productoAgregado = productos.find(e => e.code == req.body.code);
    manager.addProduct(req.body);
    productoAgregado == null ? res.status(200).send('producto agregado') : res.status(400).send("Bad request")
});

app.post('/cart', (req, res) => {
    const newCart = req.body;
    if (newCart.length) {
        cart = newCart
        return res.send("producto agregado");
    }
    res.status(400).send("Bad request");
})

app.get('/cart', (req, res) => {
    res.send(cart)
})

app.put('/productos/:id', (req, res) => {
    manager.updateProduct(Number(req.params.id), req.body)
    if(res.status(200)){    
        res.send('Producto Actualizado');
    } else {
        res.status(400).send('Bad request');
    }
    
});

app.delete('/cart/:id', (req, res) => {
    manager.deleteProduct(req.params.id)
    const producto = (cart.find(e => e.id == Number(req.params.id)))
    if (producto == null) {
        res.send('producto eliminado del carrito')
    }
    res.status(400).send('Bad request')
})

app.listen(port, () => {
    console.log(`listen on localhost:${port}`);
});