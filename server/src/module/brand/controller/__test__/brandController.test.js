const BrandController = require("../brandController");
const BrandIdNotDefinedError = require("../../error/BrandIdNotDefined");
const createBrandTest = require("../__test__/brandFixture");

class MockError extends Error {};

const mockService = {
  save: jest.fn(),
  getAll: jest.fn(() => createBrandTest()),
  getById: jest.fn(() => createBrandTest(1)),
  delete: jest.fn(() => true),
};

const reqMock = {
  query: {},
  body: createBrandTest(1),
  params: {
    id: 1,
  },
};
const next = jest.fn();
const resMock = {
  json: jest.fn(),
  sendStatus: jest.fn(),
  status: jest.fn(() => resMock),
};

const mockController = new BrandController({ brandService: mockService });

describe("BrandController methods", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("index calls services's getAll, res.status and res.json with a brand object", async () => {
    await mockController.index(reqMock, resMock, next);

    const data = await mockService.getAll();

    expect(mockService.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(data);
  });

  test("save calls service's save method and res status with 201", async () => {
    await mockController.save(reqMock, resMock, next);

    expect(mockService.save).toHaveBeenCalledTimes(1);
    expect(mockService.save).toHaveBeenCalledWith(reqMock.body);
    expect(resMock.sendStatus).toHaveBeenCalledTimes(1);
    expect(resMock.sendStatus).toHaveBeenCalledWith(201);
  });

  test("save calls next when receives an error from service's save method", async () => {
    mockService.save.mockImplementationOnce(() => {
      throw new MockError();
    });

    await mockController.save(reqMock, resMock, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("edit calls service's save method and res status with 200", async () => {
    await mockController.edit(reqMock, resMock, next);

    expect(mockService.save).toHaveBeenCalledTimes(1);
    expect(mockService.save).toHaveBeenCalledWith(reqMock.body);
    expect(resMock.sendStatus).toHaveBeenCalledWith(200);
  });

  test("edit calls next when receives an error from service's save method", async () => {
    mockService.save.mockImplementationOnce(() => {
      throw new MockError();
    });

    await mockController.edit(reqMock, resMock, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("getById calls service's getById method and responds with status 200 and json", async () => {
    await mockController.getById(reqMock, resMock, next);

    const brand = mockService.getById(1);

    expect(mockService.getById).toHaveBeenCalledTimes(2);
    expect(mockService.getById).toHaveBeenCalledWith(1);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(brand);
  });

  test("getById calls next when receives an error from service's getById method", async () => {
    mockService.getById.mockImplementationOnce(() => {
      throw new MockError();
    });

    await mockController.getById(reqMock, resMock, next);
    expect(next).toHaveBeenCalledTimes(1);
  });


  test("delete calls service's delete method and response with status 200", async () => {
    await mockController.delete(reqMock, resMock, next);

    const brand = await mockService.getById(1);

    expect(mockService.getById).toHaveBeenCalledTimes(2);
    expect(mockService.delete).toHaveBeenCalledTimes(1);
    expect(mockService.delete).toHaveBeenCalledWith(brand);
  });

  test("delete calls next when receives an error from service's delete method", async () => {
    mockService.delete.mockImplementationOnce(() => {
      throw new MockError();
    });

    await mockController.delete(reqMock, resMock, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

});
