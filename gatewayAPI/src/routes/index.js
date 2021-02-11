//api/modulo/token/servico/acao
module.exports = (app) => {
  app.use('', require('./core')());
};