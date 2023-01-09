const whitelist = require('../config/config-cors');
module.exports = corsOptions = {
    origin: function (origin, callback) {
        // añadimos !origin porque cuando desarrollamos en localhost, origin es undefined.
        console.log('Origen: %o', origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(
                new Error(
                    'No se pueden ejecutar comandos desde otro dominio (CORS)'
                )
            );
        }
    },
    optionsSuccessStatus: 200,
};
