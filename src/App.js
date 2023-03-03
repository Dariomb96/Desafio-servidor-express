require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { cartRouter } = require('./routes/cartRouter');
const { productRouter } = require('./routes/productRouter');
const { viewsRouter } = require('./routes/viewsRouter');
const { loginRouter } = require('./routes/loginRouter');
const { profileRouter } = require('./routes/profileRouter');
const { signupRouter } = require('./routes/signupRouter');

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
    console.log(`listen on localhost:${port}`);
});

//const USER_MONGO = process.env.USER_MONGO;
//const PASS_MONGO = process.env.PASS_MONGO;
//const DB_MONGO = process.env.DB_MONGO;
//const STRING_CONNECTION = `mongodb+srv://${USER_MONGO}:${PASS_MONGO}@cluster0.5xfau6w.mongodb.net/${DB_MONGO}?retryWrites=true&w=majority`

const socketServer = new Server(httpServer);
mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://admin:D9KYfHyWUicmEYAf@cluster0.5xfau6w.mongodb.net/?retryWrites=true&w=majority`, (err) => {
    if (err) {
        console.log('cannot connect to database: ' + err);
    } else { console.log('connected to database') }
});

app.engine('handlebars', engine());

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(cookieParser());
app.use(
    session({
        secret: "coderhouse",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://admin:D9KYfHyWUicmEYAf@cluster0.5xfau6w.mongodb.net/?retryWrites=true&w=majority`,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 15,
        }),
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/', viewsRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/profile", profileRouter);


socketServer.on('connection', socket => {
    console.log('new client connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});