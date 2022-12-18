const ControlerException = require('../utils/ControlerException');
const { ValidationError } = require('sequelize');

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
            throw new ControlerException(
                'Problemas al crear el registro',
                404,
                error
            );
        }
    }
    async findAll() {
        try {
            return await this.model.findAll();
        } catch (error) {
            throw new ControlerException(
                'Recurso no disponible',
                404,
                error.message
            );
        }
    }
    async findOne(id) {
        if (!id) throw new ControlerException('Falta el identificador', 400);
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
            const result = await current.save();
            return result;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ControlerException(
                    'No se puede sustituir el recurso',
                    406,
                    error.message
                );
            } else {
                throw error;
            }
        }
    }

    async patchOne(id, value) {
        try {
            const tax = await this.findOne(id);
            const result = await tax.update(value);
            return result;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ControlerException(
                    'Problemas con la actualización',
                    405,
                    error.message
                );
            } else {
                throw error;
            }
        }
    }
    async deleteOne(id) {
        try {
            const tax = await this.findOne(id);
            const result = await tax.destroy();
            return result;
        } catch (error) {
            throw new ControlerException(
                'Problemas al borrar el registro',
                405,
                error
            );
        }
    }
}
module.exports = Controller;
