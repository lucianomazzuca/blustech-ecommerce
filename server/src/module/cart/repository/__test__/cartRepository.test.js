const { Sequelize } = require("sequelize");
const CartRepository = require('../cartRepository');
const CartModel = require('../../model/cartModel');
const UserModel = require('../../../user/model/userModel');
const createUserTest = require('../../../user/controller/__test__/userFixture');
const createCartTest = require('../../controller/__test__/cart.fixture.js')


describe("CartRepository methods", () => {
  let sequelizeInstance;
  let cartModel;
  let userModel;
  let cartRepository;

  beforeEach(async () => {
    sequelizeInstance = new Sequelize("sqlite::memory", { logging: false });
    userModel = UserModel.setup(sequelizeInstance);
    cartModel = CartModel.setup(sequelizeInstance);
    cartRepository = new CartRepository({ cartModel, userModel });

    await sequelizeInstance.sync({ force: true });

    // Create a new user 
    const newUser = createUserTest();
    await userModel.create(newUser);
  });

  test("something", async () => {
    const cart = createCartTest(1, 1);
    const cartSaved = await cartRepository.save(cart);
    console.log(cartSaved)
    expect(cartSaved.id).toEqual(1)
  });

  
})