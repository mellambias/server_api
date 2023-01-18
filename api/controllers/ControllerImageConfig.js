const Controller = require('./Controller');

class ControllerImageConfig extends Controller {
    constructor(model) {
        super(model);
        this.model = model;
    }
}
module.exports = ControllerImageConfig;
