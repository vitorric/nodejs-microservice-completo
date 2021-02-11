const { User } = require('../src/schemas/user.js'),
  faker = require('faker'),
  { encrypt } = require('../src/utils/crypto.js');

exports.createUserFactory = async (email = null, password = null) => {
  return User.create({
    name: faker.name.findName(),
    email: (email) ? email : faker.email(),
    password: encrypt((password) ? password : faker.password()),
    role: 'user'
  });
};