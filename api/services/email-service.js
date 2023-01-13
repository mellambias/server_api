const nodemailer = require('nodemailer');
const db = require('../models');
const Controller = require('../controllers/Controller');

const smtpConfigDefault = {
    email: process.env.EMAIL,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
};

module.exports = class EmailService {
    constructor(config = smtpConfigDefault) {
        if (typeof EmailService.instance === 'object') {
            // console.log('singleton EmailService');
            return EmailService.instance;
        }
        // console.log('nueva instancia EmailService');
        this.mailServiceTransport = nodemailer;
        this.email = process.env.EMAIL;
        this.config = config;
        this.controller = new Controller(db.Email);
        // conexion con el servidor de correo
        this.transport = async () => await this.getTransport();
        EmailService.instance = this;
        return this;
    }

    async getTransport() {
        try {
            return this.mailServiceTransport.createTransport({
                pool: true,
                tls: {
                    ciphers: 'SSLv3',
                },
                ...this.config,
            });
        } catch (error) {
            console.log(
                'No se puede conectar al servidor de correo %o',
                error.message
            );
        }
    }

    // async sendEmail(email, destination = this.email, options = {})
    async sendEmail(from, options = {}, to = this.email) {
        const mailOptions = {
            from: from,
            to: to,
            ...options,
        };
        const activeTransport = await this.transport();
        activeTransport.sendMail(mailOptions, async (err, result) => {
            const data = {
                from: result.envelope.from,
                to: result.envelope.to.toString(),
                message: mailOptions.html,
            };
            if (err) {
                console.log('(email-service) Error: %o', err);
                data.isSendOk = false;
                data.error = err;
                try {
                    await this.controller.create(data);
                } catch (error) {
                    console.log('(email-service) %o', error);
                }
            } else {
                // console.log('%o - Correo enviado - %o', new Date(), result);
                data.isSendOk = true;
                try {
                    await this.controller.create(data);
                } catch (error) {
                    console.log('(email-service) %o', error);
                }
            }
        });
    }
};
