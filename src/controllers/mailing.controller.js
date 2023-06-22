import { ticketModel } from "../dao/models/ticket.js";
import { cartsModel } from '../dao/models/cart.js';
import transport from "../config/mail.config.js";

export async function sendEmail(req, res) {
    try {
        const name = req.body.name;
        const total = req.body.total;
        const userId = req.user._id;
        const ticket = await ticketModel.create({
            purchase_datetime: new Date(),
            amount: total,
            code: Math.random().toString(36).substr(2, 9),
            name: name,
            purchaser: userId,
            created_at: new Date(),
            updated_at: new Date(),
        });
        console.log(`nombre: ${name}, total: ${total}, ticket: ${ticket}`);
        const ticketHtml = `
        <div>
            <h1>Ticket de compra</h1>
            <p>Fecha de compra: ${ticket.purchase_datetime}</p>
            <p>Monto: ${ticket.amount}</p>
            <p>Comprador: ${ticket.purchaser}</p>
        </div>`;
        console.log("Antes de eliminar el carrito" + userId);
        await cartsModel.deleteOne({ userId: userId });
        console.log("Después de eliminar el carrito");
        await transport.sendMail({
            from: 'test <betancourtdariom@gmail.com>',
            to: 'betancourtdariom@gmail.com',
            subject: 'test',
            html: ticketHtml,
            attachments: []
        });
        res.status(200).send('Correo enviado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo');
    }
}