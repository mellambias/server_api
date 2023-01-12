const nodemailer = require('nodemailer');

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
        // conexion con el servidor de correo
        this.transport = (async () => await this.getTransport())();
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

    async sendEmail(email, destination = this.email, options = {}) {
        const mailOptions = {
            from: this.email,
            to: destination ? destination : this.email,
            subject: email.subject,
            html: email.content,
            ...options,
        };
        const activeTransport = await this.transport;
        activeTransport.sendMail(mailOptions, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // Aquí podríamos registrar en una base de datos los correos enviados
                console.log('%o - Correo enviado - %o', new Date(), result);
            }
        });
    }
};
