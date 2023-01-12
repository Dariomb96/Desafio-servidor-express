const express = require('express');
const app = express();
const port = 8080;

const {cartRouter} = require('./routes/cartRouter')
const {productRouter} = require('./routes/productRouter')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use ('/api/products', productRouter);
app.use ('/api/cart', cartRouter);


app.listen(port, () => {
    console.log(`listen on localhost:${port}`);
});