/**
 * Rutas para los contactos
 */

const Controller = require('../controllers/Controller');
const RouterApp = require('./RouterApp');
const cors = require('cors');
const corsOptions = require('../utils/serverCors');
const EmailService = require('../services/gmail-service');

class Contact extends RouterApp {
    constructor(model, middlewares = {}, controllerClass = Controller) {
        super(model, middlewares, controllerClass);
        return this;
    }
    configRouter() {
        // console.log('Configurando %o', this.controler);
        if (this.middlewares?.all.length) {
            this.router.use(this.middlewares.all);
        }
        this.router.use(cors(corsOptions));
        this.router.post('/', this.middlewares.post, async (req, res) => {
            const body = req.body;
            const data = {
                name: body.nombre,
                surnames: body.apellidos,
                phone: body.telefono,
                email: body.email,
                message: body.mensaje,
            };
            try {
                await this.controler.create(data);
            } catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
            const emailOptions = {
                subject: 'Nuevo mensaje de un usuario',
                html: `
<p><strong style="font-size:1.2rem; color:blue;">${body.nombre} ${body.apellidos}</strong></p>
Le ha enviado este mensaje :
<pre>" ${body.mensaje} "
<div>
<b style="color:blue;">Responder al :</b>
    <b>Telefono:</b> ${body.telefono}
    <b>Correo:</b> ${body.email}
</div>
</pre>`,
                cc: 'mellambias@gmail.com',
                replyTo: body.email,
            };
            new EmailService().sendEmail(data.email, emailOptions);
            res.status(200).json(req.body);
        });
    }
}
module.exports = Contact;
