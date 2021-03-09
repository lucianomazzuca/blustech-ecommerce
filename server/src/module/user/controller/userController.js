class UserController {
  constructor({ userRepository }) {
    this.userRepository = userRepository;

  }
  
 async index(req, res) {
    res.send('llegaste')
  }

  async login(req, res) {
    console.log(req.session)
    res.send('logueado')
  }
}

module.exports = UserController;