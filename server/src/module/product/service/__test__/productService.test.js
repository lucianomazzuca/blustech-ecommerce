const ProductService = require("../productService");
const createProductTest = require("../../controller/__test__/product.fixture");
const ProductNotDefinedError = require("../../error/ProductNotDefinedError");
const ProductIdNotDefinedError = require("../../error/ProductIdNotDefinedError");
const ArgumentIsNotArrayError = require("../../error/ArgumentIsNotArrayError");
const ArgumentIsEmptyError = require("../../error/ArgumentIsEmpty");

const mockRepository = {
  getAll: jest.fn(),
  getById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  getMany: jest.fn(),
};

const mockService = new ProductService({ productRepository: mockRepository });

describe("ProductService methods", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("save calls repository's save method", async () => {
    const product = createProductTest();
    await mockService.save(product);

    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledWith(product);
  });

  test("save throws an error because of lack of Product entity as argument", async () => {
    const product = {
      id: 1,
      model: "RTX 580",
      price: 100,
      discount: 0,
      image: "default",
      description: "lorem ipsum",
      category_id: 1,
      brand_id: 1,
    };

    await expect(mockService.save(product)).rejects.toThrowError(
      ProductNotDefinedError
    );
  });

  test("getAll calls repository's getAll method", async () => {
    const offset = 0;
    const limit = 10;
    const term = "rtx";
    const category = "motherboard";
    const brand = "asus";
    const sort = undefined;

    await mockService.getAll(offset, limit, term, category, brand, sort);

    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    expect(mockRepository.getAll).toHaveBeenCalledWith(
      offset,
      limit,
      term,
      category,
      brand,
      sort
    );
  });

  test("getById calls repository's getById method", async () => {
    await mockService.getById(1);

    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.getById).toHaveBeenCalledWith(1);
  });

  test("getById throws an error on undefined id as argument", async () => {
    await expect(mockService.getById()).rejects.toThrowError(
      ProductIdNotDefinedError
    );
  });

  test("delete calls repository's delete method", async () => {
    const product = createProductTest();
    await mockService.delete(product);

    expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(product);
  });

  test("delete throws an error because of lack of Brand entity as argument", async () => {
    const product = {
      id: 1,
      model: "RTX 580",
      price: 100,
      discount: 0,
      image: "default",
      description: "lorem ipsum",
      category_id: 1,
      brand_id: 1,
    };

    await expect(mockService.delete(product)).rejects.toThrowError(
      ProductNotDefinedError
    );
  });

  test("getMany throws error when the argument is not an array", async () => {
    await expect(mockService.getMany()).rejects.toThrowError(
      ArgumentIsNotArrayError
    );
  });

  test("getMany throws error when the argument has a length of 0", async () => {
    await expect(mockService.getMany([])).rejects.toThrowError(
      ArgumentIsEmptyError
    );
  });

  test("getMany calls repository's getMany method", async () => {
    await mockRepository.getMany([1, 2]);

    expect(mockRepository.getMany).toHaveBeenCalledTimes(1);
    expect(mockRepository.getMany).toHaveBeenCalledWith([1, 2]);
  });
});
