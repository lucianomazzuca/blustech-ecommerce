const { initCategoryModule } = require('../module');

const router = {};

const configureRouter = jest.fn(() => router)

const app = {
  use: jest.fn()
}

const container = {
  resolve: jest.fn(() => configureRouter),
  cradle: jest.fn(() => categoryRouter)
};

test("Category module gets initialized correctly", () => {
  initCategoryModule(app, container);

  expect(container.resolve).toHaveBeenCalledTimes(1);
  expect(container.resolve).toHaveBeenCalledWith('configureCategoryRouter');

  expect(configureRouter).toHaveBeenCalledTimes(1);
  expect(configureRouter).toHaveBeenCalledWith(container.cradle);

  expect(app.use).toHaveBeenCalledTimes(1);
  expect(app.use).toHaveBeenCalledWith('/categories', router);
});