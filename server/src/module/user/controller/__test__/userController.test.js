const UserController = require('../userController');

const user = {
  name: 'admin',
  email: 'admin@mail.com',
  password: '123456',
}

const mockUserService = {
  getByEmail: jest.fn(() => user),
  validatePassword: jest.fn(() => true),
};

const reqMock = {
  body: Object.assign({}, user),
}

const resMock = {
  json: jest.fn(),
  status: jest.fn(() => resMock),
}

const mockUserController = new UserController({ userService: mockUserService});

describe('UserController methods', () => {
  afterEach(() => {
    Object.values(mockUserService).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });
  
  test('login returns a token when succesful', async () => {
    await mockUserController.login(reqMock, resMock);
    expect(mockUserService.getByEmail).toBeCalledTimes(1);
    expect(mockUserService.validatePassword).toHaveReturnedWith(true);
    expect(resMock.status).toHaveBeenCalledWith(200)
    expect(resMock.json).toHaveBeenCalled();
  });

  test('login returns a 401 when credentials are invalid', async () => {
    mockUserService.validatePassword = jest.fn(() => false);

    await mockUserController.login(reqMock, resMock);
    expect(mockUserService.getByEmail).toBeCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(401)
  })


})
