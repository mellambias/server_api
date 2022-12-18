const { Op } = require('sequelize');
class TaxeController {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const objModel = await this.model.create(data);
            return objModel;
        } catch (error) {
            throw new Error(`Problemas al crear el registro ${error}`);
        }
    }
    async findAll() {
        try {
            const result = await this.model.findAll();
            return result;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
    async findOne(id) {
        if (!id) throw new Error('Falta el identificador');
        try {
            const result = await this.model.findByPk(id);
            return result;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
    async updateOne(id, value) {
        if (!id) throw new Error('Falta el identificador');
        if (!value) throw new Error('Falta objeto');
        try {
            const tax = await this.findOne(id);
            const result = await tax.update(value);
            return result;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async patchOne(id, value) {
        if (!id) throw new Error('Falta el identificador');
        if (!value) throw new Error('Falta objeto');
        try {
            const tax = await this.findOne(id);
            tax.set(value);
            const result = await tax.save();
            return result;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
    async deleteOne(id) {
        if (!id) throw new Error('Falta el identificador');
        try {
            const tax = await this.findOne(id);
            const result = await tax.destroy();
            return result;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
module.exports = TaxeController;
