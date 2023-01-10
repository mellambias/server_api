/**
 * Clase que controla la Autenticación de usuarios
 */

const Controller = require('../controllers/Controller');
const RouterApp = require('./RouterApp');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const corsOptions = require('../utils/serverCors');

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
            console.log(req.body);
            res.status(200).json(req.body);
        });
    }
}
module.exports = Contact;
