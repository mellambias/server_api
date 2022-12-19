const db = require('./api/models');
const express = require('express');
const RouterApp = require('./api/routes/RouterApp');
const RouterPaymentMethod = require('./api/routes/Payment-Method');

const app = express();

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

async function serverInit(sequelize) {
    try {
        // comprueba si podemos acceder a la base de datos
        console.log('Estableciendo conexión con el SGDB:');
        await sequelize.authenticate();
        console.log('- Conexión establecida con éxito.');
        /*   en desarrollo sincronizamos la base de datos con los modelos
         *   en producción se utilizan las migraciones para sincronizar la base de datos
         */
        if (ENV === 'development') {
            console.log('- Sincronizando tablas y relaciones');
            await db.sequelize.sync({ force: true });
            console.log('- Ok, tablas sincronizadas');
        }
        console.log('Configurando servidor HTTP:');
        // config preprocessors request
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // endpoint controllers
        console.log('- Configurando enrutadores');
        app.use('/api/admin/Refunds', new RouterApp(db.Refund));
        app.use('/api/admin/Refunds-detalle', new RouterApp(db.RefundDetail));
        app.use('/api/admin/ShoppingCart', new RouterApp(db.ShoppingCart));
        app.use('/api/admin/taxes', new RouterApp(db.Taxe));
        app.use('/api/admin/Customer', new RouterApp(db.Customer));
        app.use(
            '/api/admin/metodos-pago',
            new RouterPaymentMethod(db.PaymentMethod)
        );
        app.use('/api/admin/Contact', new RouterApp(db.Contact));
        app.use('/api/admin/slider', new RouterApp(db.Slider));

        // default endpoint
        app.all('/', (req, res) => {
            res.status(404).send(`Recurso no encontrado, compruebe su url`);
        });
        console.log('- Abriendo puerto %s', PORT);
        app.listen(PORT, () => {
            console.log('Servidor ejecutandose en http://localhost:%s', PORT);
        });
    } catch (error) {
        console.error('%s', error.message);
    }
}
serverInit(db.sequelize);
