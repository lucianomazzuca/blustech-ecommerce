const { initCartModule } = require('../module');

const router = {};

const configureRouter = jest.fn(() => router)

const app = {
  use: jest.fn()
}

const container = {
  resolve: jest.fn(() => configureRouter),
  cradle: jest.fn(() => cartController)
};

test("Brand module gets initialized correctly", () => {
  initCartModule(app, container);

  expect(container.resolve).toHaveBeenCalledTimes(1);
  expect(container.resolve).toHaveBeenCalledWith('configureCartRouter');

  expect(configureRouter).toHaveBeenCalledTimes(1);
  expect(configureRouter).toHaveBeenCalledWith(container.cradle);

  expect(app.use).toHaveBeenCalledTimes(1);
  expect(app.use).toHaveBeenCalledWith('/carts', router);
});