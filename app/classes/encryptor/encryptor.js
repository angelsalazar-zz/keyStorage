// Dependecies
var crypto = require('crypto');
var config = require('../../../config');

// Init empty object
var encryptor = {};

/**
* @param dataToEncrypt String
*
* @return String
*
*/
encryptor.encrypt = function(dataToEncrypt){
  // Create cipher object
  var cipher = crypto.createCipher(config.algorithm, config.secretKey);
  // Encrypt data
  var cryted = cipher.update(dataToEncrypt, 'uft8', 'hex');
  // Returning any remaining enciphered contents
  cryted += cipher.final('hex');
  // return encrypted data
  return cryted;
}

/**
* @param dataToDecrypt String
*
* @return String
*
*/
encryptor.decrypt = function(dataToDeCrypt){
  // Create decipher object
  var decipher = crypto.createDecipher(config.algorithm, config.secretKey);
  // Decrypt data
  var decrypted  = decipher.update(dataToDeCrypt, 'hex', 'utf8');
  // Returning any remaining deciphered contents
  decrypted += decipher.final('utf8');
  // return decrypted data
  return decrypted;
}

module.exports = encryptor;
