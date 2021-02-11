//api/modulo/token/servico/acao
module.exports = (app) => {
  app.use('/api/user', require('./user')());
};