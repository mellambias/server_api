const { Router } = require('express');
const Controller = require('../controllers/Controller');
const ControlerException = require('../utils/ControlerException');
const cors = require('cors');
const corsOptions = require('../utils/serverCors');

class RouterApp {
    router = Router();
    middlewares = [];
    constructor(model, controllerClass = Controller, middlewares = []) {
        this.controler = new controllerClass(model);
        this.middlewares = middlewares;
        // obtener todos los recursos
        this.router.get('/', this.middlewares, async (req, res) => {
            try {
                const data = await this.controler.findAll(req.query);
                res.status(200).json(data);
            } catch (error) {
                console.log(error);
                res.status(400).send(`${error.message}`);
            }
        });
        //recupera informacion de un recurso por su id
        this.router.get('/:id', this.middlewares, async (req, res) => {
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
        });
        // crear un nuevo recurso
        this.router.post('/', this.middlewares, async (req, res) => {
            const data = req.body;
            try {
                const newElement = await this.controler.create(data);
                res.status(200).json(newElement);
            } catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
        // sustituye un recurso por otro.
        this.router.options('/:id', cors(corsOptions));
        this.router.put('/:id', this.middlewares, async (req, res) => {
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
        });
        // modifica campos de un recurso.
        this.router.options('/:id', cors(corsOptions));
        this.router.patch('/:id', this.middlewares, async (req, res) => {
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
        });
        // elimina un recurso.
        this.router.options('/:id', cors(corsOptions));
        this.router.delete('/:id', this.middlewares, async (req, res) => {
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
        return this.router;
    }

    get router() {
        return this.router;
    }
    get middlewares() {
        return this.middlewares;
    }
    set middlewares(middlewares) {
        this.middlewares = middlewares;
    }
}
module.exports = RouterApp;
