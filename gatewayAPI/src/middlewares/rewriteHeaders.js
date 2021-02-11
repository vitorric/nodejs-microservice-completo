
const { createtokenServices } = require('../middlewares/passport/create.js');

exports.rewriteHeaderAuthentication = (req, res, next) => {
  req.headers['authorization'] = `Bearer ${createtokenServices(req.user)}`;
  next();
};
