const { Router } = require('express');
const Controller = require('../controllers/Controller');
const ControlerException = require('../utils/ControlerException');
const cors = require('cors');
const corsOptions = require('../utils/serverCors');

class RouterApp {
    router = Router();
    constructor(model, controllerClass = Controller) {
        this.controler = new controllerClass(model);
        // crear un nuevo recurso
        this.router.post('/', async (req, res) => {
            const data = req.body;
            try {
                const newTax = await this.controler.create(data);
                res.status(200).send(newTax);
            } catch (error) {
                res.status(400).send(error.message);
            }
        });
        // obtener todos los recursos
        this.router.get('/', async (req, res) => {
            try {
                const data = await this.controler.findAll(req.query);
                res.status(200).send(data);
            } catch (error) {
                res.status(400).send(`Se ha producido un error ${error}`);
            }
        });
        //recupera informacion de un recurso por su id
        this.router.get('/:id', async (req, res) => {
            try {
                const data = await this.controler.findOne(req.params.id);
                res.status(200).send(data);
            } catch (error) {
                if (error instanceof ControlerException) {
                    res.status(error.status).send(error.message);
                } else {
                    res.status(400).send(error);
                }
            }
        });
        // sustituye un recurso por otro.
        this.router.options('/:id', cors(corsOptions));
        this.router.put('/:id', async (req, res) => {
            try {
                const data = await this.controler.updateOne(
                    req.params.id,
                    req.body
                );
                res.status(200).send(data);
            } catch (error) {
                res.status(400).send(error.message);
            }
        });
        // modifica campos de un recurso.
        this.router.options('/:id', cors(corsOptions));
        this.router.patch('/:id', async (req, res) => {
            try {
                const data = await this.controler.patchOne(
                    req.params.id,
                    req.body
                );
                res.status(200).send(data);
            } catch (error) {
                res.status(error.status).send(error.message);
            }
        });
        // elimina un recurso.
        this.router.options('/:id', cors(corsOptions));
        this.router.delete('/:id', async (req, res) => {
            try {
                const data = await this.controler.deleteOne(req.params.id);
                res.status(200).send(data);
            } catch (error) {
                if (error instanceof ControlerException) {
                    res.status(error.status).send(error.message);
                } else {
                    res.status(400).send(error);
                }
            }
        });
        return this.router;
    }
}
module.exports = RouterApp;
