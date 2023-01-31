/**
 * Rutas para menu
 */

const Controller = require('../controllers/ControllerMenu');
const RouterApp = require('./RouterApp');
const cors = require('cors');
const corsOptions = require('../utils/serverCors');

class MenuRouter extends RouterApp {
    constructor(model, middlewares = {}, controllerClass = Controller) {
        super(model, middlewares, controllerClass);
        return this;
    }
    configRouter() {
        super.configRouter();
        // console.log('Configurando %o', this.controler);
        if (this.middlewares?.all.length) {
            this.router.use(this.middlewares.all);
        }
        this.router.use(cors(corsOptions));
        this.router.get(
            '/display/:name',
            this.middlewares.get,
            async (req, res) => {
                try {
                    const { name } = req.params;
                    const result = await this.controler.getMenuItems(name);
                    res.json(result);
                } catch (error) {
                    console.log(error);
                    res.status(400).send(`${error.message}`);
                }
            }
        );
    }
}
module.exports = MenuRouter;
