const { User } = require('../src/schemas/user.js');

module.exports = async () => {
  await User.deleteMany();
};