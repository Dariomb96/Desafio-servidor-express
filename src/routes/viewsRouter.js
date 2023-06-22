import express from 'express';
import { getProducts, addToCart, renderChoice, renderCheckout, renderTicket} from '../controllers/views.controller.js';
import { sendEmail } from '../controllers/mailing.controller.js';
import passport from 'passport';


const viewsRouter = express.Router();
const auth = passport.authenticate("jwt", { session: false })

viewsRouter.get('/',auth, getProducts);
viewsRouter.post('/add-to-cart',auth, addToCart);
viewsRouter.get('/purchase',auth, renderChoice);
viewsRouter.get('/checkout',auth, renderCheckout);
viewsRouter.post('/ticket',auth, renderTicket, sendEmail);


export {viewsRouter}; 
