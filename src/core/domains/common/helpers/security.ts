import crypto from 'crypto';
import configuration from '../../../../config/configuration';

export function setPassword(password) {
  // Creating a unique salt for a particular user
  const salt =
    configuration().security.salt + crypto.randomBytes(16).toString('hex');

  // Hashing user's salt and password with 1000 iterations,
  return {
    password: crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`),
    salt: salt,
  };
}

// Method to check the entered password is correct or not
export function validPassword(password, hashPassword, salt) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return hashPassword === hash;
}
