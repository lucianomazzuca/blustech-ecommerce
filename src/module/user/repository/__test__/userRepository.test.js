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
    expect(savedUser.name).toEqual('Luciano');
    expect(savedUser.isAdmin).toEqual(false);
  });

  test('save throws an error because the argument is not an instance of User', async () => {
    const user = {
      name: 'Luciano',
      email: 'luciano@mail.com',
      password: 'test',
    };

    await expect(userRepository.save(user)).rejects.toThrowError(UserNotDefinedError);
  });

  test('updated a user name', async () => {
    const user = createTestUser();
    await userRepository.save(user);

    user.name = 'Sergio';
    const updatedUser = await userRepository.save(user);

    expect(updatedUser.name).toEqual('Sergio');
  });

  test('getById returns an user', async () => {
    const user = createTestUser();
    await userRepository.save(user);
    const savedUser = await userRepository.getById(1);
    expect(savedUser.id).toEqual(1);
  });

  test('getById throws an error because the argument is empty', async () => {
    await expect(userRepository.getById()).rejects.toThrowError(UserIdNotDefinedError);
  });

  test('getById throws an error because there is no user with that id in the DB', async () => {
    await expect(userRepository.getById(100)).rejects.toThrowError(UserNotFoundError);
  });

})