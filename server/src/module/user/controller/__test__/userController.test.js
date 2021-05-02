const UserController = require('../userController');
const createUserTest = require('./userFixture');

const mockUser = createUserTest();

const mockUserService = {
  getByEmail: jest.fn(() => mockUser),
  validatePassword: jest.fn(() => true),
};

const reqMock = {
  body: mockUser,
}

const nextMock = jest.fn();

const resMock = {
  json: jest.fn(),
  sendStatus: jest.fn(),
  status: jest.fn(() => resMock),
};

const mockUserController = new UserController({ userService: mockUserService});

describe('UserController methods', () => {
  afterEach(() => {
    Object.values(mockUserService).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });
  
  test("login calls service's getByEmail and validatePassword, then responds with a jwt as json", async () => {
    const user = createUserTest();

    await mockUserController.login(reqMock, resMock, nextMock);

    expect(mockUserService.getByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserService.getByEmail).toHaveBeenCalledWith(reqMock.body.email);

    expect(mockUserService.validatePassword).toHaveBeenCalledTimes(1);
    expect(mockUserService.validatePassword).toHaveBeenCalledWith(reqMock.body.password, user.password);

    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith({ succes: true, token });
  });


})
