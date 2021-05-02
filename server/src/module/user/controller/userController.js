const { fromFormToEntity } = require("../mappers/userMapper");
const UserWrongCredentialsError = require('../error/UserWrongCredentialsError');

class UserController {
  constructor({ userService, genJWT }) {
    this.userService = userService;
    this.genJWT = genJWT;
  }

  async index(req, res) {
    console.log(req.user);
  }

  async login(req, res, next) {
    try {
      const user = await this.userService.getByEmail(req.body.email);
      await this.userService.validatePassword(req.body.password, user.password);

      const jwt = this.genJWT(user.id);

      return res.status(200).json({ success: true, token: jwt });
    } catch (e) {
      if (e == UserWrongCredentialsError) {
        return res.status(401).json({ msg: "Wrong credentials" });
      }

      next(e);
    }
  }

  async register(req, res, next) {
    try {
      let user = fromFormToEntity(req.body);

      // Check if email is already in the DB
      const userAlreadyRegistered = await this.userService.getByEmail(user.email);
      if (userAlreadyRegistered) {
        return res.status(400).json([{ param: 'email', msg: 'This email is already registerd' }]);
      };

      user.password = await this.userService.genPassword(user.password);
      await this.userService.save(user);

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
