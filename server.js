const path = require('path');
const db = require('./api/models');
const express = require('express');
const RouterApp = require('./api/routes/RouterApp');
const UserSignin = require('./api/routes/UserSignin');
const verifyUserToken = require('./api/middlewares/auth-jwt');
const cookieParser = require('cookie-parser');
const RouterAuthorization = require('./api/routes/RouterAuthorization');
const ImageSettingRouter = require('./api/routes/Image-config');
const RouterManyToMany = require('./api/routes/RouterManyToMany');
const Contact = require('./api/routes/Contact');
const Checkout = require('./api/routes/Checkout');
const ROLE_LIST = require('./api/config/roles-list');
const verifyRoles = require('./api/middlewares/verify-jwt');
const multer = require('multer');
const MenuRouter = require('./api/routes/MenuRouter');
const app = express();

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); //  cuando el payload contiene json
app.use(cookieParser()); // para decodificar las cookies que se envian desde el cliente
/**
 * configura la api de multer, para los archivos contenidos en el body
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'api/storage/tmp/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// sirve ficheros estaticos: css, js, img, etc
app.use('*', express.static(path.join(__dirname, '/public')));
/**
 * Inicializa el servidor conectando a SGDB
 * @method
 * @async
 */
(async function serverInit(sequelize) {
    try {
        // comprueba si podemos acceder a la base de datos
        await sequelize.authenticate();
        /*   en desarrollo sincronizamos la base de datos con los modelos
         *   en producción se utilizan las migraciones para sincronizar la base de datos
         */
        if (ENV === 'development') {
            // await db.sequelize.sync({ force: true }); // sincroniza la estructura de la base de datos con los modelos destruyendo los datos existentes
            // console.log('actualizando...');
            // await db.sequelize.sync({ update: true }); // actualiza la esctructura de la base de datos con los modelos.
        }
        // endpoint controllers
        console.log('- Configurando enrutadores');
        app.use('/api/admin/book', new RouterApp(db.Book).router);
        app.use('/api/admin/company', new RouterApp(db.Company).router);
        app.use('/api/admin/contact', new RouterApp(db.Contact).router);
        app.use('/api/admin/customer', new RouterApp(db.Customer).router);
        app.use('/api/admin/fingerprint', new RouterApp(db.Fingerprint).router);
        app.use(
            '/api/admin/image-resized',
            new RouterApp(db.ImageResized).router
        );
        app.use(
            '/api/admin/image-setting',
            new ImageSettingRouter(db.ImageSetting).router
        );
        app.use('/api/admin/language', new RouterApp(db.Language).router);
        app.use('/api/admin/locale', new RouterApp(db.Locale).router);
        app.use('/api/admin/menu', new MenuRouter(db.Menu).router);
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
        app.use(
            '/api/admin/refund-detail',
            new RouterApp(db.RefundDetail).router
        );
        app.use('/api/admin/refund', new RouterApp(db.Refund).router);
        app.use('/api/admin/rol', new RouterApp(db.Role).router);
        app.use('/api/admin/sale-detail', new RouterApp(db.SaleDetail).router);
        app.use('/api/admin/sale-fail', new RouterApp(db.SaleFail).router);
        app.use('/api/admin/sale', new RouterApp(db.Sale).router);
        app.use(
            '/api/admin/shopping-cart-detail',
            new RouterApp(db.ShoppingCartDetail).router
        );
        app.use(
            '/api/admin/shopping-cart',
            new RouterApp(db.ShoppingCart).router
        );
        app.use(
            '/api/admin/slider',
            new ImageSettingRouter(
                db.Slider,
                {
                    post: [upload.fields([{ name: 'image', maxCount: 1 }])],
                },
                db.OriginalImage,
                db.ImageResized,
                db.ImageSetting
            ).router
        );
        app.use('/api/admin/taxes', new RouterApp(db.Taxe).router);
        // //crea un usuario
        app.use(
            '/api/admin/users',
            new RouterApp(db.User, {
                get: [verifyUserToken, verifyRoles(ROLE_LIST.User)],
            }).router
        );
        console.log('/api/admin/user-rol');
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
        console.log('/api/auth/user');
        // El usuario login
        app.use('/api/auth/user', new UserSignin(db.User).router);
        console.log('/front/contact');
        // frontRouters
        app.use('/front/contact', new Contact(db.Contact).router);
        app.use('/front/checkout', new Checkout(db.Customer).router);

        // Si llega hasta aqui es porque no se ha encontrado ningun endpoint
        app.all('*', (req, res) => {
            res.status(404);
            if (req.accepts('html')) {
                // enviamos el fichero 404.html que se encuentra en el directorio views
                //res.sendFile(path.join(__dirname, 'views', '404.html'));
            } else if (req.accepts('json')) {
                res.json({
                    message: `Recurso no encontrado, compruebe su url`,
                });
            } else {
                res.type('txt').send(`Recurso no encontrado, compruebe su url`);
            }
        });
        // Cuando estamos haciendo TEST el framework crea su propio servidor
        if (ENV != 'test') {
            // console.log('- Abriendo puerto %s', PORT);
            app.listen(PORT, async () => {
                console.log(
                    'Servidor ejecutandose en http://localhost:%s',
                    PORT
                );
            });
        }
    } catch (error) {
        console.error('(ServerInit) %s %o', error.message, error);
    }
})(db.sequelize);

module.exports = app;
