/*
 * clase que extiende RouterManyToMany
 * añadiendo rutas para los modelos relacionados
 * para la autorización de acceso
 */
const RouterApp = require('./RouterApp');
const Controller = require('../controllers/ControllerManyToMany');
const RouterManyToMany = require('./RouterManyToMany');

const USERS = 0;
const ROLES = 1;

class RouterAuthorization extends RouterManyToMany {
    constructor(
        model,
        entities = [],
        middlewares = {},
        controllerClass = Controller
    ) {
        super(model, entities, middlewares, controllerClass);
        return this;
    }
    configRouter() {}
    configRouterManyToMany() {
        // Rutas que toman el primer modelo como referencia
        console.log('(->) RouterAuthorization configRouter');
        console.log(this.entities);
        console.log(
            `(25) ${this.entities[ROLES].path}/:${this.entities[USERS].param}`
        );
        if (this.middlewares?.all.length) {
            this.router.use(this.middlewares.all);
        }
        this.router
            .route(
                `${this.entities[ROLES].path}/:${this.entities[USERS].param}`
            )
            .get(this.middlewares.get, async (req, res) => {
                try {
                    const roles = {};
                    const controler = new Controller(
                        this.entities[USERS].model
                    );
                    const primaryKey = {
                        [this.entities[USERS].primaryKey]:
                            req[this.entities[USERS].param],
                    };
                    const records = await controler.findAllRelationRecords(
                        primaryKey,
                        this.entities[ROLES].model
                    );

                    records.map(
                        record => (roles[record.roleName] = record.roleNumber)
                    );
                    res.status(200).json(roles);
                } catch (error) {
                    console.log(error);
                    res.status(400).send(`${error.message}`);
                }
            });
    }
}

module.exports = RouterAuthorization;
