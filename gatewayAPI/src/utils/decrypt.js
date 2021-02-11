const crypto = require('crypto');

const algorithm = 'aes-192-cbc',
  password = 'H2kujP9cRWBTa2BzajfYquGoZuTOt8Ei49BIHqeSXXNQa2ySPNV7litwmp05QZGp';

exports.decrypt = (textEncrypt) => {
  try {
    const key = crypto.scryptSync(password, 'salt', 24);
    // The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    // Encrypted using same algorithm, key and iv.
    const encrypted = textEncrypt;

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Erro in Utils.decrypt');
  }
};