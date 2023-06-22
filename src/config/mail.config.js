import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'betancourtdariom@gmail.com',
        pass: 'lurhomutmsnaylfr'
    }
});

export default transport;