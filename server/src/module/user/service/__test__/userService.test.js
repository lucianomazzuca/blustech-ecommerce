const UserService = require('../userService');
const createTestUser = require('../../controller/__test__/userFixture');
const UserNotDefinedError = require('../../error/UserNotDefinedError');
const UserAlreadyExistsError = require('../../error/UserAlreadyExistsError');
const UserWrongCredentialsError = require('../../error/UserWrongCredentialsError');

const mockUserRepository = {
  save: jest.fn(),
  getById: jest.fn(),
  getByEmail: jest.fn(),
  register: jest.fn(),
};

const mockUserService = new UserService({ userRepository: mockUserRepository });

describe('UserService methods', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
  });

  test("getByEmail calls repository's save method", async () => {
    const email = 'test@email.com'
    await mockUserService.getByEmail(email)
    expect(mockUserRepository.getByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(email);
  });

  test("register calls repository's save method after checking that the email is not in use", async () => {
    mockUserService.getByEmail = jest.fn(() => null);
    mockUserService.genPassword = jest.fn(() => '1234');

    const user = createTestUser();
    await mockUserService.register(user);
    expect(mockUserService.getByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserService.genPassword).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
  });

  test("register throws an error when the email already exists", async () => {
    const user = createTestUser()
    mockUserService.getByEmail = jest.fn(() => user.email);

    await expect(mockUserService.register(user)).rejects.toThrowError(UserAlreadyExistsError);
  });

  test("register throws an error when the argument is not an instance of User", async () => {
    const user = {
      name: 'Luciano',
      email: 'luciano@mail.com',
      password: 'test',
    }

    await expect(mockUserService.register(user)).rejects.toThrowError(UserNotDefinedError)
  })

  test("validatePassword compares a password with a hash and returns true", async () => {
    const password = '123456';
    const hash = '$2b$10$tYNNaCC3oT4268p7YPXQmOccSfqpe.TDYZM5eBcH7/bSsvYxnVVWC'
    
    expect(await mockUserService.validatePassword(password, hash)).toEqual(true)
  });

  test("validatePassword throws an error when the password doesn't match with the hash", async () =>{
    const password = '123456';
    const hash = 'hash'

    await expect(mockUserService.validatePassword(password, hash)).rejects.toThrowError(UserWrongCredentialsError)
  });
  
})