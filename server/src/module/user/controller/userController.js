const { validPassword } = require("../../../utils/password");
const genJWT = require("../../../utils/genJWT");

class UserController {
  constructor({ userRepository, userModel }) {
    this.userRepository = userRepository;
    this.userModel = userModel;
  }

  async index(req, res) {
    res.send("llegaste");
  }

  async login(req, res) {
    const user = await this.userModel.findOne({ where: { email: req.body.email } });

    if (!user) {
      throw new Error("User doesn't exist")
    }

    const isValid = validPassword(req.body.password, user.password);

    if (!isValid) {
      return res.status(401).json({ success: false, msg: 'Wrong password'});
    }

    const jwt = genJWT(user.id);

    return res.status(200).json({ success: true, token: jwt })
  }

  async getUser(req, res) {
    if (req.isAuthenticated()) {
      console.log("logged");
      console.log(req.session);
    } else {
      console.log("not logged");
    }
  }
}

module.exports = UserController;
