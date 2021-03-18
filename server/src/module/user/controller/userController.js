const genJWT = require("../../../utils/genJWT");
const { validationResult } = require("express-validator");
const { fromFormToEntity } = require("../mappers/userMapper");

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  async index(req, res) {
    console.log(req.user);
    res.send("estas autenticado");
  }

  async login(req, res) {
    // Check errors from login validator
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.errors);
    }

    try {
      const user = await this.userService.getByEmail(req.body.email);
      await this.userService.validatePassword(req.body.password, user.password);

      const jwt = genJWT(user.id);

      return res.status(200).json({ success: true, token: jwt });
    } catch (e) {
      return res.status(401).json({ msg: "Wrong credentials" });
    }
  }

  async register(req, res, next) {
    // Check erros from register validator
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.errors);
    }
    
    try {
      const user = fromFormToEntity(req.body);
      await this.userService.register(user)

      return res.status(201).json({ msg: 'success'});

    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res) {
    res.status(200).json(req.user);
  }
}

module.exports = UserController;
