const request = require('supertest');
const app = require('../server');
const db = require('../api/models');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});
const customer = {
    name: 'Antonio',
    surnames: 'Recio Mata Moros',
    phone: '661259824',
    email: 'recio@mariscos.com',
    town: 'Madrid',
    postalCode: '01600',
    address: 'Calle Ave del paraiso',
};

describe('Api test customer', () => {
    test('GET /customer', async () => {
        const response = await request(app)
            .get('/api/admin/customer')
            .set('Accept', 'application/json');
        expect(response.body).toEqual([]);
        expect(response.body).toHaveLength(0);
        expect(response.statusCode).toBe(200);
    });
    test('POST /customer', async () => {
        const response = await request(app)
            .post('/api/admin/customer')
            .set('Accept', 'application/json')
            .send(customer);
        expect(response.body.name).toEqual(customer.name);
        expect(response.body.surnames).toEqual(customer.surnames);
        expect(response.body.phone).toEqual(customer.phone);
        expect(response.body.email).toEqual(customer.email);
        expect(response.statusCode).toBe(200);
    });
    test('PUT /customer/1', async () => {
        customer.name = 'nuevoNombre';
        const response = await request(app)
            .put('/api/admin/customer/1')
            .set('Accept', 'application/json')
            .send(customer);
        expect(response.body.name).toEqual('nuevoNombre');
        expect(response.body.surnames).toEqual(customer.surnames);
        expect(response.body.phone).toEqual(customer.phone);
        expect(response.body.email).toEqual(customer.email);
        expect(response.statusCode).toBe(200);
    });
    test('PATCH /customer/1', async () => {
        const response = await request(app)
            .patch('/api/admin/customer/1')
            .set('Accept', 'application/json')
            .send({ surnames: 'Mariscos recio' });
        expect(response.body.surnames).toEqual('Mariscos recio');
        expect(response.body.phone).toEqual(customer.phone);
        expect(response.body.email).toEqual(customer.email);
        expect(response.statusCode).toBe(200);
    });
    test('GET /customer/1', async () => {
        customer.name = 'nuevoNombre';
        const response = await request(app)
            .get('/api/admin/customer/1')
            .set('Accept', 'application/json');
        expect(response.body.name).toEqual(customer.name);
        expect(response.body.surnames).toEqual('Mariscos recio');
        expect(response.body.phone).toEqual(customer.phone);
        expect(response.body.email).toEqual(customer.email);
        expect(response.statusCode).toBe(200);
    });
    test('GET /customer?q=name:nuevoNombre&c=name', async () => {
        const response = await request(app)
            .get('/api/admin/customer?q=name:nuevoNombre&c=name')
            .set('Accept', 'application/json');
        expect(response.body).toEqual([{ name: 'nuevoNombre' }]);
        expect(response.body).toHaveLength(1);
        expect(response.statusCode).toBe(200);
    });
    test('DELETE /customer/1', async () => {
        customer.name = 'nuevoNombre';
        const response = await request(app)
            .delete('/api/admin/customer/1')
            .set('Accept', 'application/json');
        expect(response.body.name).toEqual(customer.name);
        expect(response.body.phone).toEqual(customer.phone);
        expect(response.body.email).toEqual(customer.email);
        expect(response.statusCode).toBe(200);
    });
});
