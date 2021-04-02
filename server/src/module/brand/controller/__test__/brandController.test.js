const BrandController = require('../brandController');
const BrandIdNotDefinedError = require('../../error/BrandIdNotDefined');
const createBrandTest = require('../__test__/brandFixture');

const mockService = {
  save: jest.fn(),
  getAll: jest.fn(() => createBrandTest()),
};

const reqMock = {
  query: {}
};
const next = jest.fn();
const resMock = {
  json: jest.fn(),
  status: jest.fn(() => resMock),
};

const mockController = new BrandController({ brandService: mockService });

describe('BrandController methods', () => {
  afterEach(() => {
    Object.values(mockService).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });
  
  test("index calls services's getAll, res.status and res.json with a brand object", async () => {
    await mockController.index(reqMock, resMock, next);
    
    const data = await mockService.getAll();
    
    expect(mockService.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(data);
  });
  
})