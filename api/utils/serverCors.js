const whitelist = require('../config/ConfigCors');
module.exports = corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(
                'No se pueden ejecutar comandos desde otro dominio (CORS)'
            );
        }
    },
};
