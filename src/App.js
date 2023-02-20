const express = require('express');
const { engine } = require('express-handlebars');
require('dotenv').config();
const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
    console.log(`listen on localhost:${port}`);
});
const { Server } = require('socket.io');
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.USER_MONGO}:${process.env.PASS_MONGO}@cluster0.5xfau6w.mongodb.net/${process.env.DB_MONGO}?retryWrites=true&w=majority`, (err) => {
    if (err) {
        console.log('cannot connect to database: ' + err);
    } else { console.log('connected to database')}});

    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '/views');
    //const { cartRouter } = require('./routes/cartRouter');
    //const { productRouter } = require('./routes/productRouter');
    const { viewsRouter } = require('./routes/viewsRouter');
    const socketServer = new Server(httpServer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'))
    //app.use('/api/products', productRouter);
    //app.use('/api/cart', cartRouter);
    app.use('/', viewsRouter);

    socketServer.on('connection', socket => {
        console.log('new client connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
