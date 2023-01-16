/*
 *   Pasaremos los roles permitidos y esta función devolverá el middleware.
 */
const verifyRoles = (...allowedRoles) => {
    // midleware que utiliza los parametros
    // console.log('(6 verify-jwt) usamos el middleware');
    return (req, res, next) => {
        // comprobamos que exista una petición que haya pasado la Autenticación
        if (!req?.roles) {
            res.sendStatus(401);
        }
        const rolesArray = [...allowedRoles];
        // console.log('(12 verifyRoles) rolesArray %o', rolesArray);
        // console.log('(13 verifyRoles) req.roles %o', req.roles);
        // comparamos los roles permitidos con los roles que tiene el usuario
        const result = req.roles
            .map(role => rolesArray.includes(role))
            .find(val => val === true);
        // si no esta autorizado, mandamos el codigo no autorizado
        if (!result) {
            res.sendStatus(401);
        }
        next();
    };
};
module.exports = verifyRoles;
