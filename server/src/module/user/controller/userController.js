class UserController {
  constructor({ userRepository }) {
    this.userRepository = userRepository;

  }
  
 async index(req, res) {
    // if (req.session.viewCount) {
    //   req.session.viewCount = req.session.viewCount + 1;  
    // } else {
    //   req.session.viewCount = 1
    // }
    // console.log(req.session.viewCount)
    // return res.send('hello, you have visited this site ' + req.session.viewCount + ' times');
  }
}

module.exports = UserController;