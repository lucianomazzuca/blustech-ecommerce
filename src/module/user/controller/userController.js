const UserRepository = require('../repository/userRepository');

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;

    this.index = this.index.bind(this);
  }
  
 async index(req, res) {
    const users = await this.userRepository.getAll();

    return res.send(users);
  }
}

module.exports = new UserController(UserRepository);