const Controller = require('../controllers/Controller');
const RouterApp = require('./RouterApp');

class RouterPaymentMethod extends RouterApp {
    constructor(model) {
        super(model, Controller);
    }
}
module.exports = RouterPaymentMethod;
