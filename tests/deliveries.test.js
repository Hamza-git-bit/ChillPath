const request = require('supertest');
const express = require('express');
const deliveryRoutes = require('../routes/deliveries');

const app = express();
app.use(express.json());
app.use('/api/deliveries', deliveryRoutes);

describe('Deliveries API', () => {
  test('POST /api/deliveries should fail with missing fields', async () => {
    const res = await request(app).post('/api/deliveries').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/All fields/);
  });

  test('GET /api/deliveries returns array', async () => {
    const res = await request(app).get('/api/deliveries');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
