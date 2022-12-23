/**
 * Ejemplo de clase que extiende RouterApp
 */

const Controller = require('../controllers/UserSigninController');
const RouterApp = require('./RouterApp');

class UserSignin extends RouterApp {
    constructor(model, controllerClass = Controller, middlewares = []) {
        super(model, controllerClass, middlewares);
        console.log('Este es foo', this);
        this.post('/signin', async (req, res) => {
            res.status(200).json(req.body);
            const data = req.body;
            try {
                const newElement = await this.controler.find(data);
                res.status(200).json(newElement);
            } catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
        return super.router;
    }
}
module.exports = UserSignin;
