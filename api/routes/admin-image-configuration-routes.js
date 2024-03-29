module.exports = (app, upload) => {
    const router = require('express').Router();
    const authJwt = require('../middlewares/auth-jwt.js');
    const controller = require('../controllers/admin/image-configuration-controller.js');

    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );
        next();
    });

    router.post('/', [authJwt.verifyUserToken], controller.create);
    router.put('/:id', [authJwt.verifyUserToken], controller.update);
    router.delete('/:id', [authJwt.verifyUserToken], controller.delete);

    app.use('/api/admin/image-configurations', router);
};
