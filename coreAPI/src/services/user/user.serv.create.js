const { createUserRepository, getUserByEmailRepository } = require('../../repositories/user/_user.repo.js'),
  { createTokenGateway } = require('../../middleware/passport/passport.create.js'),
  { encrypt } = require('../../utils/crypto.js');

module.exports = async (user) => {
  if (!user.email ||
        !user.password ||
        !user.name) {
    throw { msg: 'Dados inválidos!' };
  }

  const userAlreadyExists = await getUserByEmailRepository(user.email);

  if (userAlreadyExists) {
    throw { msg: 'Usuário já cadastrado'};
  }

  const encryptedPassword = encrypt(user.password);

  user['password'] = encryptedPassword;

  const newUser = await createUserRepository(user);

  let userToEncrypt = JSON.stringify({
    _id: newUser._id
  });

  const token = createTokenGateway(encrypt(userToEncrypt));

  return {
    user: {
      name: newUser.name
    },
    token
  };
};