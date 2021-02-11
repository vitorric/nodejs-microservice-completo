
const passport = require('passport'),
  JwtStrategy = require('passport-jwt'),
  ExtractJwt = require('passport-jwt');

module.exports = () => {
  passport.use('gatewayAuth', new JwtStrategy.Strategy({
    jwtFromRequest: ExtractJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_SERVICES
  }, async (payload, done) => {
    if (!payload.auth)
      return done(null, false);

    if (!payload.auth.fromGateway) {
      return done(null, false);
    }

    done(null, payload.auth);
  }));
  return passport;
};