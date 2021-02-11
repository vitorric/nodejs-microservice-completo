
const passport = require('passport'),
  LocalStrategy = require('passport-local'),
  { getUserByEmailRepository } = require('../../repositories/user/_user.repo.js'),
  { encrypt, decryptLoginUser } = require('../../utils/crypto.js');


module.exports = () => {
  passport.use('userLogin', new LocalStrategy.Strategy({
    usernameField: 'email',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      if (!email || !password || !req.body.buffer) {
        return done(null, null);
      }

      const passwordDecrypt = decryptLoginUser({ ciphertext: password, nonce: req.body.buffer });

      if (!passwordDecrypt) {
        return done(null, null);
      }

      const user = await getUserByEmailRepository(email);

      if (!user) {
        return done(null, null);
      }

      const encryptedPassword = encrypt(passwordDecrypt);

      if (encryptedPassword !== user.password) {
        return done(null, null);
      }

      done(null, user);
    } catch (error) {
      return done(error.message, false);
    }
  }));

  return passport;
};