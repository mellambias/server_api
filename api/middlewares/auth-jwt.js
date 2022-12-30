const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyUserToken = (req, res, next) => {
    console.log('usamos el middleware');
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    console.log(token); // Bearer token
    // comprobamos la validez del token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res.sendStatus(403); // token invalido, acceso denegado
        }
        // añadimos al objeto req el nombre del usuario que hemos codificado en el JWT
        req.user = decoded.name;
        next();
    });
};

module.exports = verifyUserToken;
