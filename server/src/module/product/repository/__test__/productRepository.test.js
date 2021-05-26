const { Sequelize } = require("sequelize");
const createTestProduct = require("../../controller/__test__/product.fixture");
const createTestBrand = require("../../../brand/controller/__test__/brandFixture");
const createTestCategory = require("../../../category/controller/__test__/categoryFixture");
const ProductRepository = require("../productRepository");
const ProductModel = require("../../model/productModel");
const BrandModel = require("../../../brand/model/brandModel");
const CategoryModel = require("../../../category/models/categoryModel");
const ProductNotDefinedError = require("../../error/ProductNotDefinedError");
const ProductIdNotDefinedError = require("../../error/ProductIdNotDefinedError");
const ProductNotFoundError = require("../../error/ProductNotFoundError");

describe("ProductRepository methods", () => {
  let sequelizeInstance;
  let productModel;
  let brandModel;
  let categoryModel;
  let productRepository;

  beforeEach(async () => {
    sequelizeInstance = new Sequelize("sqlite::memory", { logging: false });
    brandModel = BrandModel.setup(sequelizeInstance);
    categoryModel = CategoryModel.setup(sequelizeInstance);
    productModel = ProductModel.setup(sequelizeInstance);
    productModel.setupAssociation(categoryModel, brandModel);
    productRepository = new ProductRepository({
      productModel,
      categoryModel,
      brandModel,
    });

    await sequelizeInstance.sync({ force: true });

    const brandTest = createTestBrand();
    const brandMock = brandModel.create(brandTest);

    const categoryTest = createTestCategory();
    const categoryMock = categoryModel.create(categoryTest);

    await Promise.all([brandMock, categoryMock]);
  });

  test("Saves a new product in DB", async () => {
    const productTest = createTestProduct(2);
    const productSaved = await productRepository.save(productTest);

    expect(productSaved.id).toEqual(2);
    expect(productSaved.model).toBe("RTX 580");
  });

  test("updates a product", async () => {
    const product = createTestProduct(2);
    await productRepository.save(product);

    product.model = "2080 ti";
    const updatedProduct = await productRepository.save(product);
    expect(updatedProduct.id).toEqual(2);
    expect(updatedProduct.model).toBe("2080 ti");
  });

  test("save throws an error because the parameter is not an instanceof Product", async () => {
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

    await expect(productRepository.save(product)).rejects.toThrowError(
      ProductNotDefinedError
    );
  });

  test("getById returns a product", async () => {
    const product = createTestProduct();
    await productRepository.save(product);
    await productRepository.save(product);

    const selectedProduct = await productRepository.getById(2);
    expect(selectedProduct.id).toEqual(2);
  });

  test("getById throws an error because the is no brand with that id", async () => {
    const id = 2;
    await expect(productRepository.getById(id)).rejects.toThrowError(
      ProductNotFoundError
    );
  });

  test("getById throws an error because the argument is empty", async () => {
    await expect(productRepository.getById()).rejects.toThrowError(
      ProductIdNotDefinedError
    );
  });

  test("deletes a product", async () => {
    const product = createTestProduct();
    await productRepository.save(product);
    await productRepository.save(product);
    await productRepository.save(product);

    const productWithId2 = await productRepository.getById(2);
    await expect(await productRepository.delete(productWithId2)).toEqual(true);

    const allProducts = await productRepository.getAll(1, 10);
    expect(allProducts.count).toBe(2);
  });

  test("tries to delete a non-existent product in DB and returns false", async () => {
    const product = createTestProduct(1);
    await expect(await productRepository.delete(product)).toBe(false);
  });

  test("delete throws an error because the argument is not an instance of Product", async () => {
    const product = {
      id: undefined,
      model: "RTX 580",
      price: 100,
      discount: 0,
      image: "default",
      description: "lorem ipsum",
      category_id: 1,
      brand_id: 1,
    };

    await expect(productRepository.delete(product)).rejects.toThrowError(
      ProductNotDefinedError
    );
  });

  test("getAll returns the first two products in DB and total count", async () => {
    const product = createTestProduct();
    await productRepository.save(product);
    await productRepository.save(product);
    await productRepository.save(product);
    await productRepository.save(product);

    const data = await productRepository.getAll(1, 2);
    expect(data.count).toBe(4);
    expect(data.products).toHaveLength(2);
  });

  test("getMany returns multiple products based on an array id", async () => {
    const product = createTestProduct();
    await productRepository.save(product);
    await productRepository.save(product);
    await productRepository.save(product);
    await productRepository.save(product);

    const products = await productRepository.getMany([1, 3]);
    console.log(products)
    expect(products).toHaveLength(2);
    expect(products[0].id).toEqual(1);
    expect(products[1].id).toEqual(3);
  });
});
