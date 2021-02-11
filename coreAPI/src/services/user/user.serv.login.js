const { createTokenGateway } = require('../../middleware/passport/passport.create.js'),
  { encrypt } = require('../../utils/crypto.js');

module.exports = async (user) => {
  const token = createTokenGateway(encrypt(JSON.stringify({ _id: user._id })));
  return {
    user,
    token
  };
};