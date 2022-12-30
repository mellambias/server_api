/*
 * clase que extiende RouterApp
 * añadiendo rutas para los modelos relacionados
 */
const RouterApp = require('./RouterApp');
const Controller = require('../controllers/ControllerManyToMany');
const RouterManyToMany = require('./RouterManyToMany');

class RouterAuthorization extends RouterManyToMany {
    constructor(
        model,
        entities = [],
        middlewares = {},
        controllerClass = Controller
    ) {
        super(model, entities, middlewares, controllerClass);
        this.setMiddlewares(middlewares);
        this.entities = entities;
        this.model = model;
        return this;
    }

    // configParams()

    configRouter() {
        // Rutas que toman el primer modelo como referencia
        console.log(`(25) ${this.entities[1].path}/:${this.entities[0].param}`);
        this.router
            .route(`${this.entities[1].path}/:${this.entities[0].param}`)
            .get(this.middlewares.get, async (req, res) => {
                console.log('(76) %o', this.controler);
                try {
                    const controler = new RouterApp(this.entities[0].model)
                        .controler;
                    const datas = await controler.findAll({
                        attributes: ['name'],
                        where: {
                            [this.entities[0].primaryKey]:
                                req[this.entities[0].param],
                        },
                        include: [
                            {
                                model: this.entities[1].model,
                                attributes: ['roleName', 'roleNumber'],
                                through: {
                                    attributes: [],
                                },
                            },
                        ],
                    });
                    let result = datas.map(user => {
                        let data = user.dataValues;
                        let roles = {};
                        data.Roles.forEach(role => {
                            roles[role.roleName] = role.roleNumber;
                        });
                        data.Roles = roles;
                        return data;
                    });
                    res.status(200).json(result);
                } catch (error) {
                    console.log(error);
                    res.status(400).send(`${error.message}`);
                }
            });
    }
}

module.exports = RouterAuthorization;
