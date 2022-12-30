const Controller = require('./Controller');
const ControlerException = require('../utils/ControlerException');
const { ValidationError, Op } = require('sequelize');
const ValidateExceptions = require('../utils/ValidateExceptions');

/*
 *   Clase controladora para relaciones de Muchos a Muchos
 *   entre dos tablas usando una tercera
 *
 *   utiliza el modelo inyectado
 */
class ControllerManyToMany extends Controller {
    constructor(model) {
        super(model);
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
    async findAllRelationRecords(primaryKey, relModel) {
        try {
            const records = await this.model.findAll({
                where: primaryKey,
                include: [{ model: relModel, through: { attributes: [] } }],
            });
            const relationRecords = records.reduce((result, record) => {
                return record[relModel.getTableName()];
            }, {});
            return relationRecords;
        } catch (error) {
            throw new ControlerException(
                'Problemas al buscar los registros',
                404,
                error
            );
        }
    }
    async findAll(params = {}) {
        try {
            console.log('(47.controler) params %o', params);
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
            console.log('(50-Controller.js) opciones: ', opciones);
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
    async delete(params) {
        try {
            console.log('(122 delete) params %o', params);
            const records = await this.findAll({ where: params });
            records.map(async record => {
                if (record instanceof this.model) {
                    return await record.destroy();
                } else {
                    throw new ControlerException(
                        'registro a borrar no encontrado',
                        405,
                        error
                    );
                }
            });
            return records.lenght;
        } catch (error) {
            throw new ControlerException(
                'Problemas al borrar el registro',
                405,
                error
            );
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
module.exports = ControllerManyToMany;
