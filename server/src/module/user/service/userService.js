const User = require('../entity/User');
const UserNotDefinedError = require('../error/UserNotDefinedError');
const UserWrongCredentialsError = require('../error/UserWrongCredentialsError');
const UserAlreadyExistsError = require('../error/UserAlreadyExistsError');

const bcrypt = require('bcrypt');

class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async genPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async validatePassword(password, hash) {
    const result = await bcrypt.compare(password, hash);
    if (!result) {
      throw new UserWrongCredentialsError();
    }
    return result;
  }

  async save(user) {
    if (! (user instanceof User)) {
      throw new UserNotDefinedError();
    }

    return this.userRepository.save(user);
  };

  async getByEmail(email) {
    return this.userRepository.getByEmail(email);
  }

  async register(user) {
    if (! (user instanceof User)) {
      throw new UserNotDefinedError();
    }

    // Check if email is already in the DB
    const userStored = await this.getByEmail(user.email);
    if (userStored) {
      throw new UserAlreadyExistsError('This email is already registered');
    };

    // Hash password
    user.password = await this.genPassword(user.password);

    return this.userRepository.save(user);
  }
}

module.exports = UserService