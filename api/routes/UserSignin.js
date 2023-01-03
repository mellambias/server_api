/**
 * Clase que controla la Autenticación de usuarios
 */

const UserSigninController = require('../controllers/UserSigninController');
const RouterApp = require('./RouterApp');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserSignin extends RouterApp {
    constructor(
        model,
        entities = [],
        middlewares = {},
        controllerClass = UserSigninController
    ) {
        super(model, entities, middlewares, controllerClass);
        this.entities = entities;
        this.setMiddlewares(middlewares);
        return this;
    }
    configRouter() {
        console.log('Configurando UserSignin %o', this.controler);
        if (this.middlewares?.all.length) {
            this.router.use(this.middlewares.all);
        }
        this.router.post('/signin', this.middlewares.post, async (req, res) => {
            const { email, password } = req.body;
            try {
                const user = await this.controler.signin(email, password);
                // obtener los roles del usuario
                const roles = await this.controler.getRoles(user.id);
                // expiración normal entre 5 y 15 minutos (ponemos 30s para ver que sucede cuando expira)
                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            name: user.name,
                            roles: Object.values(roles),
                        },
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '15m',
                    }
                );
                // la expiración del token de refresco ha de ser mucho mayor de uno a varios dias (a efectos didacticos 1 dia)
                const refreshToken = jwt.sign(
                    { name: user.name },
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: '1d',
                    }
                );
                //Para permitir que el usuario salga "logout" guardaremos
                user.refreshToken = refreshToken;
                await this.controler.patchOne(user.id, user.dataValues);
                // respondemos con el accesToken al cliente
                // guardamos el refreshToken en una cookie no accesible a javascript con una duración igual a expiresIn
                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    sameSite: 'None',
                    // secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.status(200).json({ accessToken });
            } catch (error) {
                res.status(404).send({
                    accessToken: null,
                    message: error.message,
                });
            }
        });
        this.router.get('/refresh', this.middlewares.get, async (req, res) => {
            const cookies = req.cookies;
            console.log('cookies %o', cookies);
            try {
                if (!cookies?.jwt) {
                    return res.sendStatus(401); // no existe la cookie identificada como jwt
                }
                console.log(cookies.jwt);
                const refreshToken = cookies.jwt;
                const user = await this.controler.find({
                    refreshToken,
                });
                if (!user) {
                    return res.sendStatus(403); // forbidden
                }
                // evaluamos jwt
                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {
                        if (err || user.name !== decoded.UserInfo.name) {
                            return res.sendStatus(403);
                        }
                        // obtener los roles del usuario
                        const roles = await this.controler.getRoles(user.id);
                        //Envia un nuevo token de acceso
                        const accessToken = jwt.sign(
                            {
                                UserInfo: {
                                    name: user.name,
                                    roles: Object.values(roles),
                                },
                            },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '15m' }
                        );
                        res.status(200).json({ accessToken });
                    }
                );
            } catch (error) {
                res.status(404).send({
                    accessToken: null,
                    message: error.message,
                });
            }
        });
        this.router.get('/logout', this.middlewares.get, async (req, res) => {
            // En el cliente, eliminamos el refreshToken
            const cookies = req.cookies;
            try {
                if (!cookies?.jwt) {
                    return res.sendStatus(204); // No content
                }
                console.log(cookies.jwt);
                const refreshToken = cookies.jwt;
                //¿Esta el refreshToken en la base de datos?
                const user = await this.controler.find({
                    refreshToken,
                });
                if (!user) {
                    res.clearCookie('jwt', {
                        httpOnly: true,
                        sameSite: 'None',
                        // secure: true,
                    });
                    return res.sendStatus(204);
                }

                // Borramos el refreshToken en la base de datos
                user.refreshToken = '';
                await this.controler.patchOne(user.id, user.dataValues);
                res.clearCookie('jwt', {
                    httpOnly: true,
                    sameSite: 'None',
                    // secure: true,
                }); // secure: true - solo sirve sobre https
                res.sendStatus(204);
            } catch (error) {
                res.status(404).send({
                    accessToken: null,
                    message: error.message,
                });
            }
        });
    }
}
module.exports = UserSignin;
