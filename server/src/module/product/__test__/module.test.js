const { initProductModule } = require('../module');

const app = {
  use: jest.fn()
}
const configureProductRoutes = jest.fn();
const container = {
  resolve: jest.fn(() => configureProductRoutes),
}


test('Product module gets initialized correctly', () => {
  initProductModule(app, container);

  expect(container.resolve).toHaveBeenCalledTimes(1);
  expect(configureProductRoutes).toHaveBeenCalledTimes(1);
  expect(app.use).toHaveBeenCalledTimes(1);
})