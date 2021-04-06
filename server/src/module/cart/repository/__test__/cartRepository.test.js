const { Sequelize } = require("sequelize");
const CartRepository = require('../cartRepository');
const CartModel = require('../../model/cartModel');
const UserModel = require('../../../user/model/userModel');
const createUserTest = require('../../../user/controller/__test__/userFixture');


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

    const newUser = createUserTest();
    await userModel.create(newUser);
  });

  test("something", async () => {

  });

  
})