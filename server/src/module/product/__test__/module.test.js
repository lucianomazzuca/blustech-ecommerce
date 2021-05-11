const { initProductModule } = require('../module');

const router = {};

const configureRouter = jest.fn(() => router)

const app = {
  use: jest.fn()
}

const container = {
  resolve: jest.fn(() => configureRouter),
  cradle: jest.fn(() => productController)
};

test("Product module gets initialized correctly", () => {
  initProductModule(app, container);

  expect(container.resolve).toHaveBeenCalledTimes(1);
  expect(container.resolve).toHaveBeenCalledWith('configureProductRouter');

  expect(configureRouter).toHaveBeenCalledTimes(1);
  expect(configureRouter).toHaveBeenCalledWith(container.cradle);

  expect(app.use).toHaveBeenCalledTimes(1);
  expect(app.use).toHaveBeenCalledWith('/products', router);
});