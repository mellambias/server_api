/**
 * Rutas para los contactos
 */

const Controller = require('../controllers/Controller');
const RouterApp = require('./RouterApp');
const cors = require('cors');
const corsOptions = require('../utils/serverCors');
const EmailService = require('../services/gmail-service');

class Checkout extends RouterApp {
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
        console.log('Configurando %o', this.controler);
        if (this.middlewares?.all.length) {
            this.router.use(this.middlewares.all);
        }
        this.router.use(cors(corsOptions));
        this.router.post('/', this.middlewares.post, async (req, res) => {
            const body = req.body;
            const reqToModel = {
                name: body.nombre,
                surnames: body.apellidos,
                phone: body.telefono,
                email: body.email,
                town: body.ciudad,
                postalCode: body.codigoPostal,
                address: body.direccion,
            };
            try {
                await this.controler.create(reqToModel);
            } catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
            const emailOptions = {
                subject: 'Gracias por su compra',
                html: ``,
            };
            new EmailService().sendEmail(
                'mellambias@gmail.com',
                emailOptions,
                reqToModel.email
            );
            res.status(200).json(req.body);
        });
    }
}
module.exports = Checkout;
