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
let contact = {
    name: 'Antonio',
    surnames: 'Recio Mata Moros',
    phone: '661259824',
    email: 'recio@mariscos.com',
    message: 'Si tiene una cena elegante',
};
beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const customerCtl = new Controler(db.Customer);
    const fingerprintCtl = new Controler(db.Fingerprint);
    const newCustomer = await customerCtl.create(customer);
    const newFingerprint = await fingerprintCtl.create({
        customerId: newCustomer.id,
        fingerprint: 'asdasdasdasd',
    });
    contact.fingerprintId = newFingerprint.fingerprintId;
});

describe('Api test contact', () => {
    test('GET /contact', async () => {
        const response = await request(app)
            .get('/api/admin/contact')
            .set('Accept', 'application/json');
        expect(response.body).toEqual([]);
        expect(response.body).toHaveLength(0);
        expect(response.statusCode).toBe(200);
    });
    test('POST /contact', async () => {
        const response = await request(app)
            .post('/api/admin/contact')
            .set('Accept', 'application/json')
            .send(contact);
        expect(response.body.name).toEqual(contact.name);
        expect(response.body.surnames).toEqual(contact.surnames);
        expect(response.body.phone).toEqual(contact.phone);
        expect(response.body.email).toEqual(contact.email);
        expect(response.body.message).toEqual(contact.message);
        expect(response.body.fingerprintId).toEqual(contact.fingerprintId);
        expect(response.statusCode).toBe(200);
    });
    test('PUT /contact/1', async () => {
        contact.name = 'nuevoNombre';
        const response = await request(app)
            .put('/api/admin/contact/1')
            .set('Accept', 'application/json')
            .send(contact);
        expect(response.body.name).toEqual(contact.name);
        expect(response.body.surnames).toEqual(contact.surnames);
        expect(response.body.phone).toEqual(contact.phone);
        expect(response.body.email).toEqual(contact.email);
        expect(response.body.message).toEqual(contact.message);
        expect(response.body.fingerprintId).toEqual(contact.fingerprintId);
        expect(response.statusCode).toBe(200);
    });
    test('PATCH /contact/1', async () => {
        const response = await request(app)
            .patch('/api/admin/contact/1')
            .set('Accept', 'application/json')
            .send({ surnames: 'Mariscos recio' });
        expect(response.body.name).toEqual(contact.name);
        expect(response.body.surnames).toEqual('Mariscos recio');
        expect(response.body.phone).toEqual(contact.phone);
        expect(response.body.email).toEqual(contact.email);
        expect(response.body.message).toEqual(contact.message);
        expect(response.body.fingerprintId).toEqual(contact.fingerprintId);
        expect(response.statusCode).toBe(200);
    });
    test('GET /contact/1', async () => {
        contact.name = 'nuevoNombre';
        const response = await request(app)
            .get('/api/admin/contact/1')
            .set('Accept', 'application/json');
        expect(response.body.name).toEqual(contact.name);
        expect(response.body.surnames).toEqual('Mariscos recio');
        expect(response.body.phone).toEqual(contact.phone);
        expect(response.body.email).toEqual(contact.email);
        expect(response.body.message).toEqual(contact.message);
        expect(response.body.fingerprintId).toEqual(contact.fingerprintId);
        expect(response.statusCode).toBe(200);
    });
    test('GET /contact?q=name:nuevoNombre&c=name', async () => {
        const response = await request(app)
            .get('/api/admin/contact?q=name:nuevoNombre&c=name')
            .set('Accept', 'application/json');
        expect(response.body).toEqual([{ name: 'nuevoNombre' }]);
        expect(response.body).toHaveLength(1);
        expect(response.statusCode).toBe(200);
    });
    test('DELETE /contact/1', async () => {
        contact.name = 'nuevoNombre';
        const response = await request(app)
            .delete('/api/admin/contact/1')
            .set('Accept', 'application/json');
        expect(response.body.name).toEqual(contact.name);
        expect(response.body.phone).toEqual(contact.phone);
        expect(response.body.email).toEqual(contact.email);
        expect(response.statusCode).toBe(200);
    });
});
