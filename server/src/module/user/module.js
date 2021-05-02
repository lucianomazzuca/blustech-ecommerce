const configureUserRouter = require('./route/userRoute');
const UserController = require('./controller/userController');
const UserModel = require('./model/userModel');
const UserRepository = require('./repository/userRepository');
const UserService = require('./service/userService');

function initUserModule(app, container) {
  const configureRouter = container.resolve('configureUserRouter');
  const userRouter = configureRouter(container.cradle);
  app.use('/users', userRouter);
}

module.exports = {
  UserController,
  UserModel,
  UserRepository,
  UserService,
  configureUserRouter,
  initUserModule
}