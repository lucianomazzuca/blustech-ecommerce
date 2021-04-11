const CartService = require('../cartService');
const createCartTest = require('../../controller/__test__/cart.fixture');
const CartNotDefinedError = require('../../error/CartNotDefinedError');
const UserIdNotDefinedError = require('../../../user/error/UserIdNotDefinedError');

const mockCartRepository = {
  save: jest.fn(),
  getByUserId: jest.fn(),
};

const mockCartService = new CartService({ cartRepository: mockCartRepository });

describe('CartService methods', () => {
  test("save calls repository's save method", async () => {
    const cart = createCartTest();
    await mockCartService.save(cart);

    expect(mockCartRepository.save).toHaveBeenCalledTimes(1);
    expect(mockCartRepository.save).toBeCalledWith(cart);
  });

  test("save throws an error because of lack of Cart entity as argument", async () => {
    const cart = {
      id: undefined,
      user_id: 1,
    };

    await expect(mockCartService.save(cart)).rejects.toThrowError(CartNotDefinedError);
  });


  test("getByUserId calls repository's getByUserId method", async () => {
    await mockCartService.getByUserId(1);

    expect(mockCartRepository.getByUserId).toHaveBeenCalledTimes(1); 
    expect(mockCartRepository.getByUserId).toHaveBeenCalledWith(1);
  });

  test('getByUserId throws an error when the argument is not a number', async () => {
    await expect(mockCartService.getByUserId()).rejects.toThrowError(UserIdNotDefinedError);
  });
})