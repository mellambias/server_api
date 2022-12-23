const Controller = require('./Controller');

class UserSignin extends Controller {
    constructor(model) {
        super(model);
    }

    async signin(data) {
        try {
            const user = await this.model.find(data.email);
            return user;
        } catch (err) {}
    }
}

module.exports = UserSignin;
