const UserController = require('../userController');

const mockUserService = {
  login: jest.fn(),
};

const mockUserController = new UserController({mockUserService});

describe('UserController methods', () => {
  test('login returns a token on valid credentials', {
    
  });


})
