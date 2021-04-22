const { Sequelize } = require("sequelize");
const CartRepository = require("../cartRepository");
const CartModel = require("../../model/cartModel");
const UserModel = require("../../../user/model/userModel");
const ProductModel = require("../../../product/model/productModel");
const createUserTest = require("../../../user/controller/__test__/userFixture");
const createCartTest = require("../../controller/__test__/cart.fixture.js");
const createProductTest = require("../../../product/controller/__test__/product.fixture");
const createTestBrand = require("../../../brand/controller/__test__/brandFixture");
const createTestCategory = require("../../../category/controller/__test__/categoryFixture");

const BrandModel = require("../../../brand/model/brandModel");
const CategoryModel = require("../../../category/models/categoryModel");
const CartProductModel = require("../../model/cartProductModel");
const CartNotDefinedError = require("../../error/CartNotDefinedError");

describe("CartRepository methods", () => {
  let sequelizeInstance;
  let cartModel;
  let userModel;
  let productModel;
  let cartRepository;
  let brandModel;
  let categoryModel;
  let cartProductModel;

  beforeEach(async () => {
    sequelizeInstance = new Sequelize("sqlite::memory:", { logging: false });
    userModel = UserModel.setup(sequelizeInstance);
    productModel = ProductModel.setup(sequelizeInstance);
    cartModel = CartModel.setup(sequelizeInstance);

    categoryModel = CategoryModel.setup(sequelizeInstance);
    brandModel = BrandModel.setup(sequelizeInstance);
    cartProductModel = CartProductModel.setup(sequelizeInstance);

    productModel.setupAssociation(categoryModel, brandModel);

    // cartModel.setupAssociation(userModel, productModel);

    cartModel.belongsToMany(productModel, {
      through: cartProductModel,
      foreignKey: "cart_id",
      as: "products",
      uniqueKey: "id",
    });

    productModel.belongsToMany(cartModel, {
      through: cartProductModel,
      foreignKey: "product_id",
      as: "carts",
      uniqueKey: "id",
    });

    cartRepository = new CartRepository({
      cartModel,
      userModel,
      productModel,
      cartProductModel,
    });

    await sequelizeInstance.sync({ force: true });

    const newUser = userModel.create(createUserTest());
    const newBrand = brandModel.create(createTestBrand());
    const newCategory = categoryModel.create(createTestCategory());
    const newProduct = productModel.create(createProductTest());

    await Promise.all([newUser, newBrand, newCategory, newProduct]);
  });

  test("saves a new cart in DB", async () => {
    const cart = createCartTest(undefined, 1);
    const cartSaved = await cartRepository.save(cart);

    expect(cartSaved.id).toEqual(1);
    expect(cartSaved.user_id).toEqual(1);
  });

  test("saves throws an error because the argument is not an instance of Cart", async () => {
    const cart = {
      user_id: 1,
    };

    await expect(cartRepository.save(cart)).rejects.toThrowError(
      CartNotDefinedError
    );
  });

  test("getByUserId returns a cart saved in the DB", async () => {
    const cart = createCartTest(undefined, 1);
    await cartRepository.save(cart);

    const cartSaved = await cartRepository.getByUserId(1);
    expect(cartSaved.id).toEqual(1);
    expect(cartSaved.user_id).toEqual(1);
  });

  test("addProduct adds a new product to an existing cart", async () => {
    await cartRepository.save(createCartTest(undefined, 1));
    await productModel.create(createProductTest());

    const cartId = 1;
    const productId = 1;
    const quantity = 1;
    await cartRepository.addProduct(cartId, productId, quantity);
    await cartRepository.addProduct(cartId, 2, 2);

    const savedCart = await cartRepository.getByUserId(1);
    expect(savedCart.id).toEqual(1);
    expect(savedCart.products[0].id).toEqual(1);
    expect(savedCart.products[0].CartProduct.quantity).toEqual(1);
  });

  test("removeProducts removes a product from an existing cart", async () => {
    await cartRepository.save(createCartTest(undefined, 1));
    await productModel.create(createProductTest());

    const cartId = 1;
    const productId = 1;
    const quantity = 1;
    await cartRepository.addProduct(cartId, productId, quantity);
    await cartRepository.addProduct(cartId, 2, 2);

    const savedCart = await cartRepository.getByUserId(1);
    expect(savedCart.id).toEqual(1);

    await cartRepository.removeProduct(cartId, productId);
    const updatedCart = await cartRepository.getByUserId(1);
    expect(updatedCart.products).toHaveLength(1);
  });

  test("changeQuantity modifies the quantity of a product in a cart", async () => {
    await cartRepository.save(createCartTest(undefined, 1));

    const cartId = 1;
    const productId = 1;
    const quantity = 1;
    await cartRepository.addProduct(cartId, productId, quantity);

    await cartRepository.changeQuantity(cartId, productId, 2);

    const savedCart = await cartRepository.getByUserId(1);
    expect(savedCart.products[0].CartProduct.quantity).toEqual(2);
  });

});
