const ProductController = require("../productController");
const createProductTest = require("./product.fixture");

const mockProductArr = [
  {
    id: 1,
    model: 'product test 1'
  },
  {
    id: 2,
    model: 'product test 2'
  }
];

const mockProduct = {
  id: 1,
  model: 'product test1'
}

const reqMock = {
  query: {
    page: 1,
    term: 'test',
    limit: 10,
  },
  params: {
    id: 1
  },
  body: {
    id: 1,
    model: 'test'
  }
};

const resMock = {
  json: jest.fn(),
  status: jest.fn(() => resMock),
  sendStatus: jest.fn(),
};

const nextMock = jest.fn();

const mockProductService = {
  getAll: jest.fn(() => mockProductArr),
  getById: jest.fn(() => mockProduct),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockProductController = new ProductController({
  productService: mockProductService,
});

describe("ProductController methods", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("index calls services's getAll method and responds with a status 200 and json with the products", async () => {
    const reqMock = {
      query: {
        page: 1,
        term: 'test',
        category: 'motherboard',
        brand: 'asus',
        limit: 10,
        sort: 'createdAt'
      }
    }
    
    await mockProductController.index(reqMock, resMock, nextMock);
    expect(mockProductService.getAll).toHaveBeenCalledTimes(1);
    expect(mockProductService.getAll).toHaveBeenCalledWith(0, 10, 'test', 'motherboard', 'asus', 'createdAt');

    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(mockProductArr);
  });

  test("index sets page to 1 if its less than zero or undefined", async () => {
    const reqMock = {
      query: {
        page: -1,
        term: 'test',
        category: 'motherboard',
        brand: 'asus',
        limit: 10,
        sort: 'createdAt'
      }
    }
    
    await mockProductController.index(reqMock, resMock, nextMock);
    expect(mockProductService.getAll).toHaveBeenCalledTimes(1);
    expect(mockProductService.getAll).toHaveBeenCalledWith(0, 10, 'test', 'motherboard', 'asus', 'createdAt');
  })

  test("index sets limit to 10 if its less than 1 or undefined", async () => {
    const reqMock = {
      query: {
        page: 1,
        term: 'test',
        category: 'motherboard',
        brand: 'asus',
        limit: undefined,
        sort: 'createdAt'
      }
    }
    
    await mockProductController.index(reqMock, resMock, nextMock);
    expect(mockProductService.getAll).toHaveBeenCalledTimes(1);
    expect(mockProductService.getAll).toHaveBeenCalledWith(0, 10, 'test', 'motherboard', 'asus', 'createdAt');
  });

  test("getById calls service's getById method", async () => {
    await mockProductController.getById(reqMock, resMock, nextMock);

    expect(mockProductService.getById).toHaveBeenCalledTimes(1);
    expect(mockProductService.getById).toHaveBeenCalledWith(reqMock.params.id);

    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(mockProduct);
  });

  test("getById calls next if service throws an error", async () => {
    
    mockProductService.getById.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockProductController.getById(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("save calls service's save method and responds with a status of 201", async () => {
    await mockProductController.save(reqMock, resMock, nextMock);

    expect(mockProductService.save).toHaveBeenCalledTimes(1);
    expect(mockProductService.save).toHaveBeenCalledWith(reqMock.body);
    
    expect(resMock.sendStatus).toHaveBeenCalledWith(201);
  });

  test("save calls next if service throws an error", async () => {
    mockProductService.save.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockProductController.save(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("delete calls service's delete method and responds a status of 201", async () => {
    await mockProductController.delete(reqMock, resMock, nextMock);

    expect(mockProductService.getById).toHaveBeenCalledTimes(1);
    expect(mockProductService.getById).toHaveBeenCalledWith(reqMock.params.id);

    expect(mockProductService.delete).toHaveBeenCalledTimes(1);
    expect(mockProductService.delete).toHaveBeenCalledWith(mockProduct);

    expect(resMock.sendStatus).toHaveBeenCalledWith(200);
  });

  test("delete calls next if service throws an error", async () => {
    mockProductService.delete.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockProductController.delete(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("edit calls service's save method and responds with a status of 200", async () => {
    await mockProductController.edit(reqMock, resMock, nextMock);

    expect(mockProductService.save).toHaveBeenCalledTimes(1);
    expect(mockProductService.save).toHaveBeenCalledWith(reqMock.body);
    expect(resMock.sendStatus).toHaveBeenCalledWith(200);
  });

  test("edit calls next if service throws an error", async () => {
    mockProductService.save.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockProductController.edit(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  
});
