/**
 * Ejemplo de clase que extiende RouterApp
 */

const Controller = require('../controllers/Controller');
const RouterApp = require('./RouterApp');

class RouterPaymentMethod extends RouterApp {
    constructor(model, controllerClass = Controller, middlewares = []) {
        super(model, controllerClass, middlewares);
    }
}
module.exports = RouterPaymentMethod;
