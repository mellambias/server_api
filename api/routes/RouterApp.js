const { Router } = require('express');
const Controller = require('../controllers/Controller');
const ControlerException = require('../utils/ControlerException');
const cors = require('cors');
const corsOptions = require('../utils/serverCors');

class RouterApp {
    router = Router();
    middlewares = {};
    constructor(
        model,
        entities = [],
        middlewares = {},
        controllerClass = Controller
    ) {
        this.controler = new controllerClass(model);
        this.entities = entities;
        this.middlewares = middlewares;
        this.setMiddlewares(middlewares);
        this.configRouter();
        return this;
    }

    configRouter() {
        // console.log('Configurando RouterApp  %o', this.controler);
        if (this.middlewares?.all.length) {
            this.router.use(this.middlewares.all);
        }
        this.router.use(cors(corsOptions));
        this.router
            .route('/')
            .get(this.middlewares.get, async (req, res) => {
                try {
                    const data = await this.controler.findAll(
                        this.controler.querysToArguments(req.query)
                    );
                    res.status(200).json(data);
                } catch (error) {
                    console.log(error);
                    res.status(400).send(`${error.message}`);
                }
            })
            // crear un nuevo recurso
            .post(this.middlewares.post, async (req, res) => {
                const data = req.body;
                try {
                    const newElement = await this.controler.create(data);
                    res.status(200).json(newElement);
                } catch (error) {
                    console.log(error);
                    res.status(400).send(error.message);
                }
            });
        //recupera informacion de un recurso por su id
        this.router
            .route('/:id')
            .get(this.middlewares.get, async (req, res) => {
                try {
                    const data = await this.controler.findOne(req.params.id);
                    res.status(200).send(data);
                } catch (error) {
                    console.log(error);
                    if (error instanceof ControlerException) {
                        res.status(error.status).send(error.message);
                    } else {
                        res.status(400).send(error);
                    }
                }
            })
            // sustituye un recurso por otro.
            .options(cors(corsOptions))
            .put(this.middlewares.put, async (req, res) => {
                try {
                    const data = await this.controler.updateOne(
                        req.params.id,
                        req.body
                    );
                    res.status(200).json(data);
                } catch (error) {
                    console.log(error);
                    res.status(400).send(error.message);
                }
            })
            // modifica campos de un recurso.
            .options(cors(corsOptions))
            .patch(this.middlewares.patch, async (req, res) => {
                try {
                    const data = await this.controler.patchOne(
                        req.params.id,
                        req.body
                    );
                    res.status(200).json(data);
                } catch (error) {
                    console.log(error);
                    res.status(error.status).send(error.message);
                }
            })
            // elimina un recurso.
            .options(cors(corsOptions))
            .delete(this.middlewares.delete, async (req, res) => {
                try {
                    const data = await this.controler.deleteOne(req.params.id);
                    res.status(200).json(data);
                } catch (error) {
                    console.log(error);
                    if (error instanceof ControlerException) {
                        res.status(error.status).send(error.message);
                    } else {
                        res.status(400).send(error);
                    }
                }
            });
    }

    setMiddlewares(value) {
        const METHODS = ['all', 'get', 'post', 'put', 'patch', 'delete'];
        METHODS.forEach(method => {
            this.middlewares[method] = value[method] || [];
        });
    }
}
module.exports = RouterApp;
