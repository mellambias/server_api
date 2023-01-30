const Controller = require('./Controller');

class ControllerMenu extends Controller {
    constructor(model) {
        super(model);
        this.model = model;
    }
}
module.exports = ControllerMenu;
