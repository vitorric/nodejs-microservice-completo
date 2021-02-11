const JWT = require('jsonwebtoken');

exports.createtokenServices = user => {
  var exp = new Date();
  exp.setMinutes(exp.getMinutes() + 1);
  return JWT.sign({
    auth: user,
    exp: exp.getTime()
  },
  process.env.JWT_SECRET_SERVICES);
};