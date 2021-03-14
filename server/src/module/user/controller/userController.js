const { validatePassword } = require("../../../utils/password");
const genJWT = require("../../../utils/genJWT");

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  async index(req, res) {
    res.send("llegaste");
  }

  async login(req, res) {
    const user = await this.userService.getByEmail(req.body.email);
    const isValid = validatePassword(req.body.password, user.password);

    if (!isValid) {
      return res.status(401).json({ msg:"Wrong credentials"});
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
