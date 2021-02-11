const { User } = require('../../schemas/user.js'),
  { ObjectIdCast } = require('../../utils/index.js');

module.exports = async (userId) => {
  return User.findOne({
    _id: ObjectIdCast(userId),
    status: true,
    delete: false
  }).exec();
};