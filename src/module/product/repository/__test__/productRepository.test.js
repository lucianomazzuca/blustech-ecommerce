const { Sequelize } = require("sequelize");
const createTestProduct = require('../../controller/__test__/product.fixture');
const ProductRepository = require("../productRepository");
const ProductModel = require("../../model/productModel");
const BrandModel = require("../../../brand/model/brandModel");
const CategoryModel = require("../../../category/models/categoryModel");

describe("ProductRepository methods", () => {
  let sequelizeInstance;
  let productModel;
  let brandModel;
  let categoryModel;
  let productRepository;

  beforeEach(async (done) => {
    sequelizeInstance = new Sequelize("sqlite::memory", { logging: console.log });
    productModel = ProductModel.setup(sequelizeInstance);
    brandModel = BrandModel.setup(sequelizeInstance);
    categoryModel = CategoryModel.setup(sequelizeInstance);
    productModel.setupAssociation(categoryModel, brandModel);
    productRepository = new ProductRepository({productModel, categoryModel, brandModel});

    await sequelizeInstance.sync({ force: true });

    done();
  });

  afterAll(async (done) => {
    await sequelizeInstance.close();
  });

  test("Saves a new product in DB", async () => {
    const productTest = createTestProduct();
    const productSaved = await productRepository.save(productTest);
    
    expect(productSaved.model).toBe('RTX 580')
  });
});
