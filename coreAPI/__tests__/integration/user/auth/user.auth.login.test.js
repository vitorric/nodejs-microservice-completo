const request = require('supertest'),
  app = require('../../../../app.js'),
  truncate = require('../../../truncate.js'),
  { createUserFactory } = require('../../../factory.js'),
  crypto = require('crypto');


describe('User Authentication Login', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should user login', async () => {

    await createUserFactory('test1@email.com', crypto.createHash('md5').update('123456').digest('hex'));

    const user = {
      email: 'test1@email.com',
      password: crypto.createHash('md5').update('123456').digest('hex'),
    };

    let encryptObj = encryptUserLoginTest(user.password);

    let newParams = {
      email: user.email,
      password: encryptObj.ciphertext
    };

    newParams['buffer'] = encryptObj.nonce;

    const response = await request(app)
      .post('/api/user/auth/login')
      .send(newParams);

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(true);
    expect(typeof response.body.retorno).toBe('object');
    expect(response.body.retorno).toHaveProperty('user');
    expect(response.body.retorno).toHaveProperty('token');
  });

  it('should user not login without criptograph', async () => {

    await createUserFactory('test1@email.com', '123456');

    const user = {
      email: 'test1@email.com',
      password: '123456'
    };

    const response = await request(app)
      .post('/api/user/auth/login')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('should user not login without email', async () => {

    const user = {
      password: '1234567'
    };

    const response = await request(app)
      .post('/api/user/auth/login')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should user not login without password', async () => {

    const user = {
      email: 'test1@email.com'
    };

    const response = await request(app)
      .post('/api/user/auth/login')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should user not login without buffer', async () => {

    const user = {
      email: 'test1@email.com',
      password: '123456'
    };

    const response = await request(app)
      .post('/api/user/auth/login')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('should user not login with wrong password', async () => {

    await createUserFactory('test1@email.com', '123456');

    const user = {
      email: 'test1@email.com',
      password: '1234567'
    };

    let encryptObj = encryptUserLoginTest(user.password);

    let newParams = {
      email: user.email,
      password: encryptObj.ciphertext
    };

    newParams['buffer'] = encryptObj.nonce;

    const response = await request(app)
      .post('/api/user/auth/login')
      .send(newParams);

    expect(response.status).toBe(401);
  });
});


const encryptUserLoginTest = (text) => {
  try {
    const algorithm = 'aes-256-ctr';
    const key = 'C7yusOW9wqVLV2Ud9PvZds7ZaGfCdOXw';

    const nonce = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, nonce, {
      authTagLength: 16
    });
    const ciphertext = cipher.update(text, 'utf8', 'hex');

    cipher.final();

    return { ciphertext, nonce };
  } catch (error) {
    console.log('error encrypt login user', error);
    return '';
  }
};