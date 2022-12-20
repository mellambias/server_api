const request = require('supertest');
const app = require('../server');

describe('Api test suite', () => {
    it('prueba /contact endpoints', async () => {
        const response = await request(app)
            .get('/api/admin/contact')
            .set('Accept', 'application/json');
        console.log(response.body);
        // expect(response.body).toEqual([]);
        // expect(response.body).toHaveLength(0);}
        expect(response.statusCode).toBe(200);
        // expect(response.body).toEqual(expect.arrayContaining([]));
    });
});
