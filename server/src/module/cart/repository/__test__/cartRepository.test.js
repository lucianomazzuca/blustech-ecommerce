const { Sequelize } = require("sequelize");
const CartRepository = require('../cartRepository');
const CartModel = require('../../model/cartModel');
const UserModel = require('../../../user/model/userModel');
const ProductModel = require('../../../product/model/productModel');
const createUserTest = require('../../../user/controller/__test__/userFixture');
const createCartTest = require('../../controller/__test__/cart.fixture.js')


describe("CartRepository methods", () => {
  let sequelizeInstance;
  let cartModel;
  let userModel;
  let productModel;
  let cartRepository;

  beforeEach(async () => {
    sequelizeInstance = new Sequelize("sqlite::memory", { logging: false });
    userModel = UserModel.setup(sequelizeInstance);
    cartModel = CartModel.setup(sequelizeInstance);
    productModel = ProductModel.setup(sequelizeInstance);
    cartRepository = new CartRepository({ cartModel, userModel, productModel });

    await sequelizeInstance.sync({ force: true });

    // Create a new user 
    const newUser = createUserTest();
    await userModel.create(newUser);
  });

  test("saves a new cart in DB", async () => {
    const cart = createCartTest(1, 1);
    const cartSaved = await cartRepository.save(cart);

    expect(cartSaved.id).toEqual(1)
  });

  test("getByUserId returns a cart saved in the DB", async () => {
    const cart = createCartTest(undefined, 1);
    await cartRepository.save(cart);

    const cartSaved = await cartRepository.getByUserId(1);
    expect(cartSaved.id).toBe(1);
    expect(cartSaved.user_id).toBe(1);
  })

  // test("blablabla", async () => {
  //   const cart = createCartTest(1, 1);
  //   const cartSaved = await cartRepository.save(cart);
  //   console.log(cartSaved)
  //   expect(cartSaved.id).toEqual(1)
  // });

  
})