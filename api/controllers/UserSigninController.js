const Controller = require('./Controller');
const useBcrypt = require('sequelize-bcrypt');

class UserSigninController extends Controller {
    constructor(model) {
        super(model);
        this.model = model;
    }

    async signin(userEmail, password) {
        try {
            const user = await this.find({ email: userEmail });
            console.log(user);
            if (!user) {
                console.log('usuario inexistente');
                throw new Error('Usuario o contraseña incorrecta');
            }
            if (user.authenticate(password)) {
                return user;
            } else {
                console.log('contraseña incorrecta');
                throw new Error('Usuario o contraseña incorrecta');
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserSigninController;
