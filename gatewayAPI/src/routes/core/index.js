const router = require('express').Router(),
  httpProxy = require('express-http-proxy'),
  passport = require('passport'),
  { rewriteHeaderAuthentication } = require('../../middlewares/rewriteHeaders.js'),
  passportUser = passport.authenticate('userAuth', {session: false}),
  coreServiceProxy = httpProxy(process.env.CORE_API_URL),
  prefix = '/api/';

module.exports = () => {
  // Routes Profile
  //router.put(`${prefix}user/profile/*`, passportUser, rewriteHeaderAuthentication, coreServiceProxy);
  router.post(`${prefix}user/auth/*`, coreServiceProxy);

  return router;
};