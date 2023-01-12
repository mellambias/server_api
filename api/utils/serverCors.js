const whitelist = require('../config/config-cors');
module.exports = corsOptions = {
    origin: function (origin, callback) {
        // añadimos !origin porque cuando desarrollamos en localhost, origin es undefined.
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(
                new Error(
                    `(CORS) No se pueden ejecutar comandos desde este origen ${origin}`
                )
            );
        }
    },
    optionsSuccessStatus: 200,
};
