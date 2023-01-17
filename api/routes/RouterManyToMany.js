/*
 * clase que extiende RouterApp
 * añadiendo rutas para los modelos relacionados
 */
const RouterApp = require('./RouterApp');
const Controller = require('../controllers/ControllerManyToMany');

const ENTITY_A = 0;
const ENTITY_B = 1;

class RouterManyToMany extends RouterApp {
    constructor(
        model,
        entities = [],
        middlewares = {},
        controllerClass = Controller
    ) {
        super(model, middlewares, controllerClass);
        this.entities = entities;
        console.log('configurando RouterManyToMany');
        this.configRouterManyToMany();
        return this;
    }
    configRouter() {}
    configRouterManyToMany() {
        // configuramos los parametros de la ruta
        for (let index = 0; index < this.entities.length; index++) {
            const entity = this.entities[index];
            this.router.param(
                entity.param,
                async (req, res, next, entityKey) => {
                    try {
                        if (!req?.foreignKeys) {
                            req.foreignKeys = {};
                        }

                        const controler = new RouterApp(entity.model).controler;
                        console.log('(38) %o', controler);
                        const registro = await controler.find({
                            [entity.findKey]: entityKey,
                        });
                        if (!registro) {
                            return res.sendStatus(404);
                        }
                        console.log(
                            '(45)%o %o',
                            entity.primaryKey,
                            registro[entity.primaryKey]
                        );
                        req.foreignKeys[entity.foreignKey] =
                            registro[entity.primaryKey];
                        // params['userId'] = registro['id']
                        req[entity.param] = registro[entity.primaryKey];
                        //req['userName'] = registro['id']
                        console.log('(48) Parametros %o', req.params);
                        console.log('(49) Parametros %o', req.foreignKeys);
                        next();
                    } catch (error) {
                        throw error;
                    }
                }
            );
        }
    }

    configRouter() {
        // console.log(
        //     '(67) Configurando RouterModelsLink %o %o',
        //     this.controler,
        //     this.entities
        // );

        if (this.middlewares?.all.length) {
            this.router.use(this.middlewares.all);
        }
        console.log(
            `(72)/:${this.entities[ENTITY_A].param}/:${this.entities[ENTITY_B].param}`
        );
        this.router
            .route(
                `/:${this.entities[ENTITY_A].param}/:${this.entities[ENTITY_B].param}`
            )
            .post(this.middlewares.get, async (req, res) => {
                try {
                    const registro = await this.controler.create(
                        req.foreignKeys
                    );
                    res.json(registro);
                } catch (error) {
                    throw error;
                }
            })
            .delete(this.middlewares.delete, async (req, res) => {
                try {
                    const reply = await this.controler.delete(req.foreignKeys);
                    res.json(reply);
                } catch (error) {
                    throw error;
                }
            });
        console.log(
            `(102) ${this.entities[ENTITY_B].path}/:${this.entities[ENTITY_A].param}`
        );
        // Rutas que toman el primer modelo como referencia ENTITY_A
        this.router
            .route(
                `${this.entities[ENTITY_B].path}/:${this.entities[ENTITY_A].param}`
            )
            .get(this.middlewares.get, async (req, res) => {
                console.log('(110) %o', this.controler);
                try {
                    const primaryKey = {
                        [this.entities[ENTITY_A].primaryKey]:
                            req[this.entities[ENTITY_A].param],
                    };
                    const controler = new Controller(
                        this.entities[ENTITY_A].model
                    );
                    const data = await controler.findAllRelationRecords(
                        primaryKey,
                        this.entities[ENTITY_B].model
                    );
                    res.status(200).json(data);
                } catch (error) {
                    console.log(error);
                    res.status(400).send(`${error.message}`);
                }
            })
            .delete(this.middlewares.delete, async (req, res) => {});
        console.log(
            `(130) ${this.entities[ENTITY_A].path}/:${this.entities[ENTITY_B].param}`
        );
        // Rutas que toman el segundo modelo como referencia ENTITY_B
        this.router
            .route(
                `${this.entities[ENTITY_A].path}/:${this.entities[ENTITY_B].param}`
            )
            .get(this.middlewares.get, async (req, res) => {
                console.log('(138) %o', this.controler);
                try {
                    const primaryKey = {
                        [this.entities[ENTITY_B].primaryKey]:
                            req[this.entities[ENTITY_B].param],
                    };
                    const controler = new Controller(
                        this.entities[ENTITY_B].model
                    );
                    const data = await controler.findAllRelationRecords(
                        primaryKey,
                        this.entities[ENTITY_A].model
                    );
                    res.status(200).json(data);
                } catch (error) {
                    console.log(error);
                    res.status(400).send(`${error.message}`);
                }
            })
            .delete(this.middlewares.delete, async (req, res) => {});
    }
}

module.exports = RouterManyToMany;
