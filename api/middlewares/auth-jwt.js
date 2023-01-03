const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyUserToken = (req, res, next) => {
    console.log('(4 auth-jwt) usamos el middleware');
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    // comprobamos la validez del token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res.sendStatus(403); // token invalido, acceso denegado
        }
        // añadimos al objeto req el nombre del usuario que hemos codificado en el JWT
        req.user = decoded.UserInfo.name;
        req.roles = decoded.UserInfo.roles;
        console.log('(19 auth) req.user:%o req.roles:%o', req.user, req.roles);
        next();
    });
};

module.exports = verifyUserToken;
