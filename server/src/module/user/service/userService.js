const User = require('../entity/User');
const UserNotDefinedError = require('../error/UserNotDefinedError');
const { validatePassword } = require("../../../utils/password");
const genJWT = require("../../../utils/genJWT");

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

  async validateCredentials(email, password) {
    const user = await this.userModel.getByEmail(email)

    const isValid = validPassword(password, user.password);

    if (!isValid) {
      return false
    } else {
      return true;
    }
  }
}

module.exports = UserService