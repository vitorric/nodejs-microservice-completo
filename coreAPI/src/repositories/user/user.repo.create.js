const { User } = require ('../../schemas/user.js');

module.exports = async user => {
  return User.create(user);
};