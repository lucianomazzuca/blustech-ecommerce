const userModel = require('../model/userModel');

class UserRepository {
  constructor(_userModel) {
    this.userModel = _userModel
  }

  async getAll() {
    const users = await this.userModel.findAll();

    return users;
  }
}

module.exports = new UserRepository(userModel);