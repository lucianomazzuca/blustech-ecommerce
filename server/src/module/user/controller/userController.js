class UserController {
  constructor({ userRepository }) {
    this.userRepository = userRepository;

  }
  
 async index(req, res) {
    res.send('llegaste')
  }

  async login(req, res) {
    console.log('llego', req.body)
    res.json(req.body)
  }
}

module.exports = UserController;