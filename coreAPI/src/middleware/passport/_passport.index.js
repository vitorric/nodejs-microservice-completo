module.exports = () => {
  require('./passport.user.js')(),
  require('./passport.gateway.js')();
};

