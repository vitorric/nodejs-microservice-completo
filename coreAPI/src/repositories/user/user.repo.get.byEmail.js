const { User } = require('../../schemas/user.js');

module.exports = async (email) => {
  return User.findOne({
    email,
    status: true,
    delete: false
  }).exec();
};