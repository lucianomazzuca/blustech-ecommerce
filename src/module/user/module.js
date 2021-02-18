const UserController = require('./controller/userController');
const UserModel = require('./model/userModel');
const UserRepository = require('./repository/userRepository');
const UserRoute = require('./route/userRoute');


module.exports = {
  UserController,
  UserModel,
  UserRepository,
  UserRoute,
}