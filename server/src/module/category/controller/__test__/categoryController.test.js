const CategoryController = require("../categoryController");
const { fromFormToEntity } = require('../../mapper/categoryMapper');
const createCategoryTest = require("./categoryFixture");

const mockCategoryArray = ['motherboard', 'storage'];

const reqMock = {
  params: {
    id: 1
  },
  body: createCategoryTest(),
};

const resMock = {
  json: jest.fn(),
  status: jest.fn(() => resMock),
  sendStatus: jest.fn(),
};

const nextMock = jest.fn();

const mockCategoryService = {
  getAll: jest.fn(() => mockCategoryArray),
  save: jest.fn(),
  getById: jest.fn(() => createCategoryTest()),
  delete: jest.fn(),
};

const mockCategoryController = new CategoryController({
  categoryService: mockCategoryService,
});

describe("CategoryController methods", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("index calls service's getAll method", async () => {
    const reqMock = {
      query: {
        page: 1,
        limit: 15,
        term: 'motherboard'
      }
    }
    await mockCategoryController.index(reqMock, resMock, nextMock);

    expect(mockCategoryService.getAll).toHaveBeenCalledTimes(1);
    expect(mockCategoryService.getAll).toHaveBeenCalledWith(0, 15, 'motherboard');

    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(mockCategoryArray);
  });

  test("index sets page to 1 if it's less than zero or undefined", async () => {
    const reqMock = {
      query: {
        page: -1,
        limit: 10,
        term: 'motherboard'
      }
    }
    await mockCategoryController.index(reqMock, resMock, nextMock);

    expect(mockCategoryService.getAll).toHaveBeenCalledTimes(1);
    expect(mockCategoryService.getAll).toHaveBeenCalledWith(0, 10, 'motherboard');
  });

  test("index sets limit to 15 if it's less than 1", async () => {
    const reqMock = {
      query: {
        page: 1,
        limit: -1,
        term: 'motherboard'
      }
    }
    await mockCategoryController.index(reqMock, resMock, nextMock);
    expect(mockCategoryService.getAll).toHaveBeenCalledTimes(1);
    expect(mockCategoryService.getAll).toHaveBeenCalledWith(0, 15, 'motherboard');
  });

  test("index calls next if service throws an error", async () => {
    mockCategoryService.getAll.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockCategoryController.index(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("save calls service's save method", async () => {
    const category = createCategoryTest();
    
    await mockCategoryController.save(reqMock, resMock, nextMock);
    
    expect(mockCategoryService.save).toHaveBeenCalledTimes(1);
    expect(mockCategoryService.save).toHaveBeenCalledWith(category);

    expect(resMock.sendStatus).toHaveBeenCalledWith(201);
  });

  test("save calls next if service throws an error", async () => {
    mockCategoryService.save.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockCategoryController.save(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("edit calls service's save method", async () => {
    const category = createCategoryTest(1);
    await mockCategoryController.edit(reqMock, resMock, nextMock);
    expect(mockCategoryService.save).toHaveBeenCalledTimes(1);
    expect(mockCategoryService.save).toHaveBeenCalledWith(category);
  });

  test("edit calls next if service throws an error", async () => {
    mockCategoryService.save.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockCategoryController.edit(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("getById calls service's getById method", async () => {
    const category = createCategoryTest();

    await mockCategoryController.getById(reqMock, resMock, nextMock);
    expect(mockCategoryService.getById).toHaveBeenCalledTimes(1);
    expect(mockCategoryService.getById).toHaveBeenCalledWith(reqMock.params.id);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith({category});
  });

  test("getByID calls next if service throws an error", async () => {
    mockCategoryService.getById.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockCategoryController.getById(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("delete calls service's getById and delete methods", async () => {
    const category = createCategoryTest();
    await mockCategoryController.delete(reqMock, resMock, nextMock);

    expect(mockCategoryService.getById).toHaveBeenCalledTimes(1);
    expect(mockCategoryService.getById).toHaveBeenCalledWith(reqMock.params.id);
    expect(mockCategoryService.delete).toHaveBeenCalledTimes(1);
    expect(mockCategoryService.delete).toHaveBeenCalledWith(category);
  });

  test("delete calls next if service throws an error", async () => {
    mockCategoryService.delete.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockCategoryController.delete(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });
})