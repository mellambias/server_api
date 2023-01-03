const path = require('path');
const db = require('./api/models');
const express = require('express');
const RouterApp = require('./api/routes/RouterApp');
const UserSignin = require('./api/routes/UserSignin');
const verifyUserToken = require('./api/middlewares/auth-jwt');
const cookieParser = require('cookie-parser');
const RouterAuthorization = require('./api/routes/RouterAuthorization');
const RouterManyToMany = require('./api/routes/RouterManyToMany');
const ROLE_LIST = require('./api/config/roles-list');
const verifyRoles = require('./api/middlewares/verify-jwt');
const app = express();

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

(async function serverInit(sequelize) {
    try {
        // comprueba si podemos acceder a la base de datos
        await sequelize.authenticate();
        /*   en desarrollo sincronizamos la base de datos con los modelos
         *   en producción se utilizan las migraciones para sincronizar la base de datos
         */
        if (ENV === 'development') {
            // await db.sequelize.sync({ force: true });
            // await db.sequelize.sync({ update: true });
        }
    } catch (error) {
        console.error('%s', error.message);
    }
})(db.sequelize);
try {
    // endpoint controllers
    // console.log('- Configurando enrutadores');
    app.use('/api/admin/company', new RouterApp(db.Company).router);
    app.use('/api/admin/contact', new RouterApp(db.Contact).router);
    app.use('/api/admin/customer', new RouterApp(db.Customer).router);
    app.use('/api/admin/fingerprint', new RouterApp(db.Fingerprint).router);
    app.use('/api/admin/image-resized', new RouterApp(db.ImageResized).router);
    app.use('/api/admin/image-setting', new RouterApp(db.ImageSetting).router);
    app.use('/api/admin/language', new RouterApp(db.Language).router);
    app.use('/api/admin/locale', new RouterApp(db.Locale).router);
    app.use(
        '/api/admin/original-image',
        new RouterApp(db.OriginalImage).router
    );
    app.use(
        '/api/admin/payment-method',
        new RouterApp(db.PaymentMethod).router
    );
    app.use('/api/admin/product', new RouterApp(db.Product).router);
    app.use(
        '/api/admin/products-category',
        new RouterApp(db.ProductsCategory).router
    );
    app.use('/api/admin/refund-detail', new RouterApp(db.RefundDetail).router);
    app.use('/api/admin/refund', new RouterApp(db.Refund).router);
    app.use('/api/admin/rol', new RouterApp(db.Role).router);
    app.use('/api/admin/sale-detail', new RouterApp(db.SaleDetail).router);
    app.use('/api/admin/sale-fail', new RouterApp(db.SaleFail).router);
    app.use('/api/admin/sale', new RouterApp(db.Sale).router);
    app.use(
        '/api/admin/shopping-cart-detail',
        new RouterApp(db.ShoppingCartDetail).router
    );
    app.use('/api/admin/shopping-cart', new RouterApp(db.ShoppingCart).router);
    app.use('/api/admin/slider', new RouterApp(db.Slider).router);
    app.use('/api/admin/taxes', new RouterApp(db.Taxe).router);
    // //crea un usuario
    app.use(
        '/api/admin/users',
        new RouterApp(db.User, [], {
            get: [verifyUserToken, verifyRoles(ROLE_LIST.User)],
        }).router
    );
    app.use(
        '/api/admin/user-rol',
        new RouterAuthorization(db.UserRole, [
            {
                param: 'userName',
                findKey: 'name',
                primaryKey: 'id',
                foreignKey: 'userId',
                model: db.User,
                path: '/usuario',
            },
            {
                param: 'roleName',
                findKey: 'roleName',
                primaryKey: 'id',
                foreignKey: 'roleId',
                model: db.Role,
                path: '/role',
            },
        ]).router
    );

    // //El usuario login
    app.use('/api/auth/user', new UserSignin(db.User).router);

    // default endpoint
    app.all('/', (req, res) => {
        // res.status(404).send(`Recurso no encontrado, compruebe su url`);
        res.status(404).json({
            message: `Recurso no encontrado, compruebe su url`,
        });
    });
    if (ENV != 'test') {
        // console.log('- Abriendo puerto %s', PORT);
        app.listen(PORT, async () => {
            console.log('Servidor ejecutandose en http://localhost:%s', PORT);
        });
    }
} catch (error) {
    console.error('%s', error.message);
}

module.exports = app;
