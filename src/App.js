const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
    console.log(`listen on localhost:${port}`);
});
const {Server} = require('socket.io');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set ('views', __dirname + '/views');
const {cartRouter} = require('./routes/cartRouter');
const {productRouter} = require('./routes/productRouter');
const {viewsRouter} = require('./routes/viewsRouter');
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))
app.use ('/api/products', productRouter);
app.use ('/api/cart', cartRouter);
app.use ('/', viewsRouter);

socketServer.on('connection', socket=>{
    console.log('new client connected');
});
