const db = require('./api/models');
const express = require('express');
const RouterApp = require('./api/routes/RouterApp');
const RouterPaymentMethod = require('./api/routes/Payment-Method');

const app = express();

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async function serverInit(sequelize) {
    try {
        // comprueba si podemos acceder a la base de datos
        // console.log('Estableciendo conexión con el SGDB:');
        await sequelize.authenticate();
        // console.log('- Conexión establecida con éxito.');
        /*   en desarrollo sincronizamos la base de datos con los modelos
         *   en producción se utilizan las migraciones para sincronizar la base de datos
         */
        if (ENV === 'development') {
            // console.log('- Sincronizando tablas y relaciones');
            await db.sequelize.sync({ update: true });
            // console.log('- Ok, tablas sincronizadas');
        }
        // console.log('Configurando servidor HTTP:');
        // config preprocessors request
    } catch (error) {
        console.error('%s', error.message);
    }
})(db.sequelize);
try {
    // endpoint controllers
    // console.log('- Configurando enrutadores');
    const contact = new RouterApp(db.Contact);
    app.use('/api/admin/contact', (req, res) => {
        res.status(200).json({});
    });
    app.use('/api/admin/customer', new RouterApp(db.Customer));
    app.use('/api/admin/fingerprints', new RouterApp(db.Fingerprints));
    app.use('/api/admin/image-resized', new RouterApp(db.ImageResized));
    app.use('/api/admin/image-setting', new RouterApp(db.ImageSetting));
    app.use('/api/admin/language', new RouterApp(db.Language));
    app.use('/api/admin/locale', new RouterApp(db.Locale));
    app.use('/api/admin/original-image', new RouterApp(db.OriginalImage));
    app.use('/api/admin/payment-method', new RouterApp(db.PaymentMethod));
    app.use('/api/admin/product', new RouterApp(db.Product));
    app.use('/api/admin/products-category', new RouterApp(db.ProductsCategory));
    app.use('/api/admin/refund-detail', new RouterApp(db.RefundDetail));
    app.use('/api/admin/refund', new RouterApp(db.Refund));
    app.use('/api/admin/sale-detail', new RouterApp(db.SailDetail));
    app.use('/api/admin/sale-fail', new RouterApp(db.SailFail));
    app.use('/api/admin/sale', new RouterApp(db.Sale));
    app.use(
        '/api/admin/shopping-cart-detail',
        new RouterApp(db.ShoppingCartDetail)
    );
    app.use('/api/admin/shopping-cart', new RouterApp(db.ShoppingCart));
    app.use('/api/admin/slider', new RouterApp(db.Slider));
    app.use('/api/admin/taxes', new RouterApp(db.Taxe));
    app.use(
        '/api/admin/payment-method',
        new RouterPaymentMethod(db.PaymentMethod)
    );

    // default endpoint
    app.all('/', (req, res) => {
        // res.status(404).send(`Recurso no encontrado, compruebe su url`);
        res.status(404).json({
            message: `Recurso no encontrado, compruebe su url`,
        });
    });
    if (ENV != 'test') {
        // console.log('- Abriendo puerto %s', PORT);
        app.listen(PORT, () => {
            console.log('Servidor ejecutandose en http://localhost:%s', PORT);
        });
    }
} catch (error) {
    console.error('%s', error.message);
}

module.exports = app;
