import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { intializePassport } from './config/passport.config';

import { cartRouter } from './routes/cartRouter.js';
import { productRouter } from './routes/productRouter.js';
import { viewsRouter } from './routes/viewsRouter.js';
import { loginRouter } from './routes/loginRouter.js';
import { profileRouter } from './routes/profileRouter.js';
import { signupRouter } from './routes/signupRouter.js';
import { forgotRouter } from './routes/forgotRouter.js';
import { sessionRouter } from './routes/sessionRouter.js';

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
    console.log(`listen on localhost:${port}`);
});

const USER_MONGO = process.env.USER_MONGO;
const PASS_MONGO = process.env.PASS_MONGO;
const DB_MONGO = process.env.DB_MONGO;
const STRING_CONNECTION = `mongodb+srv://${USER_MONGO}:${PASS_MONGO}@cluster0.5xfau6w.mongodb.net/?retryWrites=true&w=majority`
const socketServer = new Server(httpServer);
mongoose.set("strictQuery", false);
mongoose.connect(STRING_CONNECTION, (err) => {
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
            mongoUrl: STRING_CONNECTION,
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
app.use("/forgot", forgotRouter);

intializePassport();
app.use(session({
    secret: "coderhouse",
}));
app.use(passport.initialize());
app.use('/api/sessions', sessionRouter);

socketServer.on('connection', socket => {
    console.log('new client connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});