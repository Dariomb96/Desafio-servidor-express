const ProductManager = require('./ProductManager.js');
const express = require('express');
const app = express();
const port = 8080
let manager = new ProductManager('./products.json');
const productos = manager.getProducts();

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
    } else { res.send(producto) }

});


app.listen(port);