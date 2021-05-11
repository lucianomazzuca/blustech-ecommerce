const { initUserModule } = require('../module');

const router = {};

const configureRouter = jest.fn(() => router)

const app = {
  use: jest.fn()
}

const container = {
  resolve: jest.fn(() => configureRouter),
  cradle: jest.fn(() => userController)
};

test("User module gets initialized correctly", () => {
  initUserModule(app, container);

  expect(container.resolve).toHaveBeenCalledTimes(1);
  expect(container.resolve).toHaveBeenCalledWith('configureUserRouter');

  expect(configureRouter).toHaveBeenCalledTimes(1);
  expect(configureRouter).toHaveBeenCalledWith(container.cradle);

  expect(app.use).toHaveBeenCalledTimes(1);
  expect(app.use).toHaveBeenCalledWith('/users', router);
});