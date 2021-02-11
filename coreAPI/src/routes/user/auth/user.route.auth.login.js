const { resJsonP } = require('../../../utils/index.js'),
  { loginUser } = require('../../../services/user/_user.serv.js');
/**
   * @api {post} /api/user/auth/login  Login Usuário
   * @apiDescription Cadastra um novo usuário
   * @apiName  auth_login
   * @apiGroup Autentitacao
   * @apiVersion 1.0.0
   * @apiParam {String} password Senha
   * @apiParam {String} email Email
   * @apiHeader Authorization Basic Access Authentication token.
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       content-type: 'application/json',
   *        Authorization : "Bearer token"
   *     }
   *
   * @apiSuccess {String} sucesso <code>Boolean</code>
   * @apiSuccess {Object} retorno objeto contendo os dados de login
   * @apiError {String} sucesso <code>false</code>
   * @apiError {String} retorno objeto contendo a msg de erro
  **/

module.exports = () => (req, res) => {
  loginUser({ ...req.body})
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};