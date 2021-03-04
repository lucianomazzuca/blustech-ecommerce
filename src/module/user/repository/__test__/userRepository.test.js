const { Sequelize } = require('sequelize');
const User = require('../../entity/User');
const UserRepository = require('../../repository/userRepository');
const UserModel = require('../../model/userModel');
const UserNotFoundError = require('../../error/UserNotFoundError');
const UserNotDefinedError = require('../../error/UserNotDefinedError');
const UserIdNotDefinedError = require('../../error/UserIdNotDefinedError');
const createTestUser = require('../../controller/__test__/userFixture');

describe('UserRepository methods', () => {
  let sequelizeInstance;
  let userModel;
  let userRepository;

  beforeEach(async () => {
    sequelizeInstance = new Sequelize('sqlite::memory', { logging: false });
    userModel = UserModel.setup(sequelizeInstance);
    userRepository = new UserRepository({ userModel });

    await sequelizeInstance.sync({ force: true });
  });

  test('save a new user', async () => {
    const user = createTestUser();
    const savedUser = await userRepository.save(user);
    expect(savedUser.id).toEqual(1);
  })
})