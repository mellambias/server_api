const ControlerException = require('../utils/ControlerException');
const { ValidationError, Op } = require('sequelize');
const ValidateExceptions = require('../utils/ValidateExceptions');

/*
 *   Clase controladora
 *   utiliza el modelo inyectado
 */
class Controller {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidateExceptions(error);
            } else {
                throw new ControlerException(
                    'Problemas al crear el registro',
                    404,
                    error
                );
            }
        }
    }
    async findAll(params = {}) {
        try {
            console.log('(31.controler) params %o', params);
            return await this.model.findAll(params);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidateExceptions(error);
            } else {
                throw new ControlerException(
                    'Recurso no disponible',
                    404,
                    error.message || ''
                );
            }
        }
    }
    async find(opciones) {
        try {
            console.log('(47-Controller.js) opciones: ', opciones);
            return await this.model.findOne({
                where: opciones,
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidateExceptions(error);
            } else {
                throw new ControlerException(
                    'Recurso no disponible',
                    404,
                    error.message
                );
            }
        }
    }

    async findOne(id) {
        if (!id) {
            throw new ControlerException('Falta el identificador', 400);
        }
        try {
            const result = await this.model.findByPk(id);
            if (!result)
                throw new ControlerException(
                    `No existe registro con identificador ${id}`,
                    404
                );
            return result;
        } catch (error) {
            throw error;
        }
    }
    async updateOne(id, value) {
        try {
            const newObject = await new this.model(value);
            await newObject.validate();
            const current = await this.findOne(id);
            current.set(newObject.dataValues);
            return await current.save();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidateExceptions(error);
            } else {
                throw new ControlerException(
                    'No se puede sustituir el recurso',
                    406,
                    error.message
                );
            }
        }
    }

    async patchOne(id, value) {
        try {
            const actual = await this.findOne(id);
            return await actual.update(value);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidateExceptions(error);
            } else {
                throw new ControlerException(
                    'Problemas con la actualización',
                    405,
                    error.message
                );
            }
        }
    }
    async deleteOne(id) {
        try {
            const actual = await this.findOne(id);
            if (actual instanceof this.model) {
                return await actual.destroy();
            } else {
                throw new ControlerException(
                    'registro a borrar no encontrado',
                    405,
                    error
                );
            }
        } catch (error) {
            throw new ControlerException(
                'Problemas al borrar el registro',
                405,
                error
            );
        }
    }

    async undoDelete(data) {
        try {
            const records = await this.model.findAll({
                where: data,
                paranoid: false,
            });
            records.map(async record => {
                try {
                    await record.restore();
                } catch (error) {
                    throw error;
                }
            });
            return records;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidateExceptions(error);
            } else {
                throw new ControlerException(
                    'Problemas al restaurar el registro',
                    404,
                    error
                );
            }
        }
    }

    querysToArguments(query) {
        let params = {};

        if (query.hasOwnProperty('c')) {
            params.attributes = query.c.split(',');
        }
        if (query.hasOwnProperty('q')) {
            params.where = query.q.split(',');
            params.where = params.where.map(e => {
                let p = {};
                const [key, value] = e.split(':');
                p[key] = value;
                return p;
            });
        }
        return params;
    }
}
module.exports = Controller;
