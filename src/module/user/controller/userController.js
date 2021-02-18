class UserController {
  constructor({UserRepository}) {
    this.userRepository = UserRepository;

  }
  
 async index(req, res) {
    const users = await this.userRepository.getAll();

    return res.send(users);
  }
}

module.exports = UserController;