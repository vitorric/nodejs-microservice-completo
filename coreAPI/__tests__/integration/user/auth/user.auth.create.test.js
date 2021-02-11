const request = require('supertest'),
  app = require('../../../../app.js'),
  truncate = require('../../../truncate.js'),
  crypto = require('crypto');

describe('User Authentication Create', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should create user', async () => {
    const user = {
      name: 'Vitor Ricardo',
      email: 'vitor@email.com',
      password: crypto.createHash('md5').update('123456').digest('hex'),
      role: 'user'
    };

    const response = await request(app)
      .post('/api/user/auth/create')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(true);
    expect(typeof response.body.retorno).toBe('object');
    expect(response.body.retorno).toHaveProperty('user');
    expect(response.body.retorno).toHaveProperty('token');
  });

  it('should not create user without email', async () => {
    const user = {
      name: 'Vitor Ricardo',
      password: '123456',
      role: 'user'
    };

    const response = await request(app)
      .post('/api/user/auth/create')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(false);
    expect(typeof response.body.retorno).toBe('object');
    expect(response.body.retorno).toHaveProperty('msg');
  });

  it('should not create user without name', async () => {
    const user = {
      password: '123456',
      email: 'vitor@email.com',
      role: 'user'
    };

    const response = await request(app)
      .post('/api/user/auth/create')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(false);
    expect(typeof response.body.retorno).toBe('object');
    expect(response.body.retorno).toHaveProperty('msg');
  });

  it('should not create user without password', async () => {
    const user = {
      name: 'Vitor Ricardo',
      email: 'vitor@email.com',
      role: 'user'
    };

    const response = await request(app)
      .post('/api/user/auth/create')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(false);
    expect(typeof response.body.retorno).toBe('object');
    expect(response.body.retorno).toHaveProperty('msg');
  });

  it('should not create user with email already registed', async () => {
    const user = {
      name: 'Vitor Ricardo',
      email: 'vitor@email.com',
      password: '123456',
      role: 'user'
    };

    await request(app)
      .post('/api/user/auth/create')
      .send(user);

    const response = await request(app)
      .post('/api/user/auth/create')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(false);
    expect(typeof response.body.retorno).toBe('object');
    expect(response.body.retorno).toHaveProperty('msg');
  });
});