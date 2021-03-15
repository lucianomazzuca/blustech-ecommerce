const User = require('../entity/User');
const UserNotDefinedError = require('../error/UserNotDefinedError');

class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
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