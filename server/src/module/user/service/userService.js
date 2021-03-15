const User = require('../entity/User');
const UserNotDefinedError = require('../error/UserNotDefinedError');
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

  
}

module.exports = UserService