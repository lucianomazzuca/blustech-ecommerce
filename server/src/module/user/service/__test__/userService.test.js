const UserService = require('../userService');
const createTestUser = require('../../controller/__test__/userFixture');
const UserNotDefinedError = require('../../error/UserNotDefinedError');

const mockUserRepository = {
  save: jest.fn(),
  getById: jest.fn(),
  getByEmail: jest.fn(),
};

const mockUserService = new UserService({ userRepository: mockUserRepository });

describe('UserService methods', () => {

  test("save calls repository's save method", async () => {
    const user = createTestUser();
    await mockUserService.save(user);

    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.save).toHaveBeenCalledWith(user)
  });

  test('save throws an error because of lack of User entity as argument', async () => {
    const user = {
      name: 'Luciano',
      email: 'luciano@mail.com',
      password: 'test',
    }

    await expect(mockUserService.save(user)).rejects.toThrowError(UserNotDefinedError)
  })
  
})