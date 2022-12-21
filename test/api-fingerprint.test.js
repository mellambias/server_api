const request = require('supertest');
const app = require('../server');
const db = require('../api/models');
const Controler = require('../api/controllers/Controller');

const customer = {
    name: 'Antonio',
    surnames: 'Recio Mata Moros',
    phone: '661259824',
    email: 'recio@mariscos.com',
    town: 'Madrid',
    postalCode: '01600',
    address: 'Calle Ave del paraiso',
};
const fingerprint = {
    customerId: 1,
    fingerprint: 'Gtfhskdfskjdru',
};

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const customerCtl = new Controler(db.Customer);
    const newCustomer = await customerCtl.create(customer);
    fingerprint.customerId = newCustomer.id;
});

describe('Api test fingerprint', () => {
    test('GET /fingerprint', async () => {
        const response = await request(app)
            .get('/api/admin/fingerprint')
            .set('Accept', 'application/json');
        expect(response.body).toEqual([]);
        expect(response.body).toHaveLength(0);
        expect(response.statusCode).toBe(200);
    });
    test('POST /fingerprint', async () => {
        const response = await request(app)
            .post('/api/admin/fingerprint')
            .set('Accept', 'application/json')
            .send(fingerprint);
        expect(response.body.customerId).toEqual(fingerprint.customerId);
        expect(response.body.fingerprint).toEqual(fingerprint.fingerprint);
        expect(response.statusCode).toBe(200);
    });
    test('PUT /fingerprint/1', async () => {
        fingerprint.fingerprint = 'nuevoNombre';
        const response = await request(app)
            .put('/api/admin/fingerprint/1')
            .set('Accept', 'application/json')
            .send(fingerprint);
        expect(response.body.customerId).toEqual(fingerprint.customerId);
        expect(response.body.fingerprint).toEqual(fingerprint.fingerprint);
        expect(response.statusCode).toBe(200);
    });
    test('PATCH /fingerprint/1', async () => {
        const response = await request(app)
            .patch('/api/admin/fingerprint/1')
            .set('Accept', 'application/json')
            .send({ fingerprint: 'Mariscos recio' });
        expect(response.body.customerId).toEqual(fingerprint.customerId);
        expect(response.body.fingerprint).toEqual('Mariscos recio');
        expect(response.statusCode).toBe(200);
    });
    test('GET /fingerprint/1', async () => {
        fingerprint.name = 'nuevoNombre';
        const response = await request(app)
            .get('/api/admin/fingerprint/1')
            .set('Accept', 'application/json');
        expect(response.body.customerId).toEqual(fingerprint.customerId);
        expect(response.body.fingerprint).toEqual('Mariscos recio');
        expect(response.statusCode).toBe(200);
    });
    test('GET /fingerprint?q&c', async () => {
        const response = await request(app)
            .get(
                '/api/admin/fingerprint?q=fingerprint:Mariscos recio&c=fingerprint'
            )
            .set('Accept', 'application/json');
        expect(response.body).toEqual([{ fingerprint: 'Mariscos recio' }]);
        expect(response.body).toHaveLength(1);
        expect(response.statusCode).toBe(200);
    });
    test('DELETE /fingerprint/1', async () => {
        const response = await request(app)
            .delete('/api/admin/fingerprint/1')
            .set('Accept', 'application/json');
        expect(response.body.customerId).toEqual(fingerprint.customerId);
        expect(response.body.fingerprint).toEqual('Mariscos recio');
        expect(response.statusCode).toBe(200);
    });
});
