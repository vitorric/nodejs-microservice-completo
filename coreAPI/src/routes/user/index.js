const router = require('express').Router(),
  { createAuthUserRouter, loginAuthUserRouter } = require('./auth/_user.route.auth.index.js'),
  passport = require('passport');

//const gatewayAuth = passport.authenticate('gatewayAuth', {session: false});
const passportUserLogin = passport.authenticate('userLogin', {session: false});

module.exports = () => {
  // Routes Auth
  router.post('/auth/create', createAuthUserRouter());
  router.post('/auth/login', passportUserLogin, loginAuthUserRouter());

  return router;
};