const db = require('./api/models');
const express = require('express');
const cors = require('cors');
const RouterApp = require('./api/routes/RouterApp');
const RouterMetodosPago = require('./api/routes/MetodosPago');

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
            await db.sequelize.sync({ update: true });
            console.log('- Ok, tablas sincronizadas');
        }
        console.log('Configurando servidor HTTP:');
        // config preprocessors request
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // endpoint controllers
        console.log('- Configurando enrutadores');
        app.use('/api/admin/taxes', new RouterApp(db.Taxe));
        app.use(
            '/api/admin/metodos-pago',
            new RouterMetodosPago(db.MetodosPago)
        );
        app.use('/api/admin/contacto', new RouterApp(db.Contacto));
        app.use('/api/admin/slider', new RouterApp(db.Slider));

        // default endpoint
        const whitelist = [
            'http://www.bdinfogestio.es',
            'https://test-cors.org/',
        ];
        const corsOptions = {
            origin: function (origin, callback) {
                if (whitelist.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback('CORS');
                }
            },
        };
        app.options('/', cors(corsOptions));
        app.delete('/', cors(corsOptions), (req, res) => {
            console.log(req.headers);
            res.status(404).send(`Recurso no encontrado, compruebe su url`);
        });
        console.log('- Abriendo puerto %s', PORT);
        app.listen(PORT, () => {
            console.log('Servidor ejecutandose en http://localhost:%s', PORT);
        });
    } catch (error) {
        console.error('(65) %s', error.message);
    }
}
serverInit(db.sequelize);
