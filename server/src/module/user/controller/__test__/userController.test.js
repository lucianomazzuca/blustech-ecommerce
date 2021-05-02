const UserController = require("../userController");
const UserWrongCredentialsError = require("../../error/UserWrongCredentialsError");
const UserAlreadyExistsError = require("../../error/UserAlreadyExistsError");
const createUserTest = require("./userFixture");

const mockUser = createUserTest(1);

const mockGenJWT = jest.fn(() => "token");

const mockUserService = {
  getByEmail: jest.fn(() => mockUser),
  validatePassword: jest.fn(() => true),
  genPassword: jest.fn(() => "hash"),
  save: jest.fn(),
};

const reqMock = {
  body: mockUser,
};

const nextMock = jest.fn();

const resMock = {
  json: jest.fn(),
  sendStatus: jest.fn(),
  status: jest.fn(() => resMock),
};

const mockUserController = new UserController({
  userService: mockUserService,
  genJWT: mockGenJWT,
});

describe("UserController methods", () => {
  afterEach(() => {
    Object.values(mockUserService).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });

  test("login calls service's getByEmail and validatePassword, then responds with a jwt as json", async () => {
    const user = createUserTest(1);

    await mockUserController.login(reqMock, resMock, nextMock);

    expect(mockUserService.getByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserService.getByEmail).toHaveBeenCalledWith(reqMock.body.email);

    expect(mockUserService.validatePassword).toHaveBeenCalledTimes(1);
    expect(mockUserService.validatePassword).toHaveBeenCalledWith(
      reqMock.body.password,
      user.password
    );

    expect(mockGenJWT).toHaveBeenCalledTimes(1);
    expect(mockGenJWT).toHaveBeenCalledWith(user.id);

    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith({
      success: true,
      token: "token",
    });
  });

  test("login returns a status 401 and error json when the service's validatePassword returns false", async () => {
    mockUserService.validatePassword.mockImplementationOnce(() => {
      throw new UserWrongCredentialsError();
    });

    await mockUserController.login(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(401);
    expect(resMock.json).toHaveBeenCalledWith({ msg: "Wrong credentials" });
  });

  test("register calls service's getByEmail, genPassword, and save methods, then responds with a code of 201", async () => {
    const user = createUserTest(1);
    mockUserService.getByEmail.mockImplementationOnce(() => null);

    await mockUserController.register(reqMock, resMock, nextMock);

    expect(mockUserService.getByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserService.getByEmail).toHaveBeenCalledWith(user.email);

    expect(mockUserService.genPassword).toHaveBeenCalledTimes(1);
    expect(mockUserService.genPassword).toHaveBeenCalledWith(user.password);

    expect(mockUserService.genPassword).toHaveBeenCalledTimes(1);

    expect(mockUserService.save).toHaveBeenCalledTimes(1);
    expect(mockUserService.save).toHaveBeenCalledWith({
      ...user,
      password: "hash",
    });

    expect(resMock.status).toHaveBeenCalledWith(201);
    expect(resMock.json).toHaveBeenCalledWith({ msg: "success" });
  });

  test("register responds with a status of 400 when getByEmail returns an user", async () => {
    await mockUserController.register(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith([
      { param: "email", msg: "This email is already registered" },
    ]);
  });

  test("register calls next when receives an error from a service method", async () => {
    mockUserService.getByEmail.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockUserController.register(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });
});
