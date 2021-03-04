const User = require('../entity/User');
const UserNotFoundError = require('../error/UserNotFoundError');
const UserNotDefinedError = require('../error/UserNotDefinedError');
const UserIdNotDefinedError = require('../error/UserIdNotDefined');
const { fromModelToEntity } = require('../mappers/userMapper');

class UserRepository {
  constructor({UserModel}) {
    this.userModel = UserModel
  }

  async save(user) {
    if (! (user instanceof User)) {
      throw new UserNotDefinedError();
    }

    const newUser = await this.userModel.build(user, {
      isNewRecord: !user.id,
    });
    await newUser.save();

    return fromModelToEntity(newUser)
  }
}

module.exports = UserRepository;