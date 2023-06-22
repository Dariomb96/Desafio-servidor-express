import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { intializePassport } from './config/passport.config.js';
import { swaggerUi, swaggerDocs } from './config/swagger.js';
import { calcTotal, calcTotalCart } from './utils.js';

import { usersRouter } from './routes/usersRouter.js';
import { mailingRouter } from './routes/mailingRouter.js';
import { cartRouter } from './routes/cartRouter.js';
import { productRouter } from './routes/productRouter.js';
import { viewsRouter } from './routes/viewsRouter.js';
import { loginRouter } from './routes/loginRouter.js';
import { profileRouter } from './routes/profileRouter.js';
import { signupRouter } from './routes/signupRouter.js';
import { forgotRouter } from './routes/forgotRouter.js';
import { sessionRouter } from './routes/sessionRouter.js';
import { mockingRouter } from './routes/mockingRouter.js';
import { loggerRouter } from './routes/loggerRouter.js';

const app = express();
const PORT = process.env.PORT || 8080;
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const httpServer = app.listen(PORT, () => {
    console.log(PORT);
});

const USER_MONGO = process.env.USER_MONGO;
const PASS_MONGO = process.env.PASS_MONGO;
const DB_MONGO = process.env.DB_MONGO;
const STRING_CONNECTION = `mongodb+srv://${USER_MONGO}:${PASS_MONGO}@cluster0.5xfau6w.mongodb.net/${DB_MONGO}?retryWrites=true&w=majority`
const socketServer = new Server(httpServer);

mongoose.set("strictQuery", false);
mongoose.connect(STRING_CONNECTION, (err) => {
    if (err) {
        console.log('cannot connect to database: ' + err);
    } else { console.log('Conectado a la base de datos:', mongoose.connection.name) };
});

const viewsDirectory = path.join(__dirname, 'views');
app.engine('handlebars', engine({
    helpers: {
        calcTotal,
        calcTotalCart
    }
}));
app.set('view engine', 'handlebars');


app.set('views', viewsDirectory);
app.set('layout', 'layouts/main')

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        return res.redirect('/login');
    }
    next();
});
app.use('/products', viewsRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/profile", profileRouter);
app.use("/forgot", forgotRouter);
app.use("/mockingproducts", mockingRouter);
app.use("/loggerTest", loggerRouter);
app.use('/mailing', mailingRouter);


/*app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = errorCodes[statusCode] || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
});*/

intializePassport();

app.use(passport.initialize());
app.use('/api/sessions', sessionRouter);

socketServer.on('connection', socket => {
    console.log('new client connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});