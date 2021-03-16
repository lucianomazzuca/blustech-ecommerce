const BrandController = require('../brandController');
const BrandIdNotDefinedError = require('../../error/BrandIdNotDefined');

const serviceMock = {
  save: jest.fn(),
  getAll: jest.fn(),
};

const reqMock = {};

const resMock = {
  json(this._json) = json
};

const mockController = new BrandController({ brandService: serviceMock });

describe('BrandController methods', () => {
  
  test('index returns all brands', async () => {
    await mockController.index(reqMock, resMock);

    expect(serviceMock.getAll).toHaveBeenCalledTimes(1);
  })
  
})