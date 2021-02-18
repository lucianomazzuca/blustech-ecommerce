class UserRepository {
  constructor({UserModel}) {
    this.userModel = UserModel
  }

  async getAll() {
    const users = await this.userModel.findAll();

    return users;
  }

}

module.exports = UserRepository;