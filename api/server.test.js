const request = require('supertest');
const server = require('./server');

describe('Server', () => {
  it('[GET] /  should return status 200', async () => {
    await request(server)
      .get('/')
      .expect(200);
  });

  it('[GET] /  should return welcome message', async () => {
    const res = await request(server).get('/');
    expect(res.body)
      .toEqual({ message: 'Welcome to Inventory App' });
  });
});
