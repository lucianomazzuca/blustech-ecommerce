const User = require('../entity/User');
const UserNotFoundError = require('../error/UserNotFoundError');
const UserNotDefinedError = require('../error/UserNotDefinedError');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');
const { fromModelToEntity } = require('../mappers/userMapper');

class UserRepository {
  constructor({ userModel }) {
    this.userModel = userModel
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
  };

  async getById(id) {
    if (!Number(id)) {
      throw new UserIdNotDefinedError();
    };

    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new UserNotFoundError(`User with id ${id} was not found`);
    } 

    return fromModelToEntity(user);
  };

  async getByEmail(email) {
    const user = await this.userModel.findOne({ where: { email: email}})
    // if(!user) {
    //   throw new UserNotFoundError(`User with this mail is not registered`);
    // }

    if (!user) {
      return null;
    }

    return fromModelToEntity(user);
  }
};

module.exports = UserRepository;