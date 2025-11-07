const request = require('supertest');
const app = require('../server/index');

describe('API Tests', () => {
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('Welcome to Medconnect API');
    });
  });

  describe('GET /api/doctors', () => {
    it('should return all doctors', async () => {
      const res = await request(app).get('/api/doctors');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('doctors');
    });
  });
});
