
const passport = require('passport'),
  JwtStrategy = require('passport-jwt'),
  ExtractJwt = require('passport-jwt'),
  { decrypt } = require('../../utils/decrypt.js');

module.exports = () => {
  passport.use('userAuth', new JwtStrategy.Strategy({
    jwtFromRequest: ExtractJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_GATEWAY
  }, async (payload, done) => {
    if (!payload.auth)
      return done(null, false);

    let user = decrypt(payload.auth);

    if (typeof user === 'undefined')
      return done(null, false);

    user = JSON.parse(user);

    done(null, {...user, fromGateway: true});
  }));

  return passport;
};