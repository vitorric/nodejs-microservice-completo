const crypto = require('crypto');

const algorithm = 'aes-192-cbc',
  password = 'H2kujP9cRWBTa2BzajfYquGoZuTOt8Ei49BIHqeSXXNQa2ySPNV7litwmp05QZGp',
  algorithmLogin = 'aes-256-ctr',
  passwordLogin = 'C7yusOW9wqVLV2Ud9PvZds7ZaGfCdOXw';

exports.encrypt = (text) => {
  try {
    const key = crypto.scryptSync(password, 'salt', 24);
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;

  } catch (error) {
    console.log(error);
  }
};

exports.decryptLoginUser = ({ ciphertext, nonce }) => {
  if (typeof nonce === 'undefined') {
    return false;
  }

  let parsedNonce = Buffer.from(nonce.data);
  const decipher = crypto.createDecipheriv(algorithmLogin, passwordLogin, parsedNonce, {
    authTagLength: 16
  });
  const receivedPlaintext = decipher.update(ciphertext, 'hex', 'utf8');

  decipher.final();

  return receivedPlaintext;
};