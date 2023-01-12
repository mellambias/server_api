/**
 * Rutas para los contactos
 */

const Controller = require('../controllers/Controller');
const RouterApp = require('./RouterApp');
const cors = require('cors');
const corsOptions = require('../utils/serverCors');
const EmailService = require('../services/gmail-service');

class Contact extends RouterApp {
    constructor(
        model,
        entities = [],
        middlewares = {},
        controllerClass = Controller
    ) {
        super(model, entities, middlewares, controllerClass);
        this.entities = entities;
        this.setMiddlewares(middlewares);
        return this;
    }
    configRouter() {
        console.log('Configurando UserSignin %o', this.controler);
        if (this.middlewares?.all.length) {
            this.router.use(this.middlewares.all);
        }
        this.router.use(cors(corsOptions));
        this.router.post('/', this.middlewares.post, async (req, res) => {
            const body = req.body;
            const email = {
                subject: 'Nuevo mensaje de un usuario',
                content: `
<p><strong style="font-size:1.2rem; color:blue;">${body.nombre} ${body.apellidos}</strong></p>
Le ha enviado este mensaje :
<pre>" ${body.mensaje} "
<div>
<b style="color:blue;">Responder al :</b>
    <b>Telefono:</b> ${body.telefono}
    <b>Correo:</b> ${body.email}
</div>
</pre>`,
            };
            new EmailService().sendEmail(email, ['mellambias@gmail.com'], {
                cc: 'mellambias@gmail.com',
                replyTo: body.email,
            });
            res.status(200).json(req.body);
        });
    }
}
module.exports = Contact;
