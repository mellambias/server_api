const Controller = require('../controllers/Controller');
const RouterApp = require('./RouterApp');

class RouterMetodosPago extends RouterApp {
    constructor(model) {
        super(model, Controller);
    }
}
module.exports = RouterMetodosPago;
