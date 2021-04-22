const CartService = require("../cartService");
const createCartTest = require("../../controller/__test__/cart.fixture");
const CartNotDefinedError = require("../../error/CartNotDefinedError");
const UserIdNotDefinedError = require("../../../user/error/UserIdNotDefinedError");

const mockCartRepository = {
  save: jest.fn(),
  getByUserId: jest.fn(),
  addProduct: jest.fn(),
  removeProduct: jest.fn(),
  changeQuantity: jest.fn(),
};

const mockCartService = new CartService({ cartRepository: mockCartRepository });

describe("CartService methods", () => {
  afterEach(() => {
    Object.values(mockCartRepository).forEach((mockFn) => mockFn.mockClear());
  });
  
  test("create calls repository's save method", async () => {
    const cart = createCartTest(undefined, 1);
    const userId = 1;
    await mockCartService.create(userId);

    expect(mockCartRepository.save).toHaveBeenCalledTimes(1);
    expect(mockCartRepository.save).toBeCalledWith(cart);
  });

  test("getByUserId calls repository's getByUserId method", async () => {
    await mockCartService.getByUserId(1);

    expect(mockCartRepository.getByUserId).toHaveBeenCalledTimes(1);
    expect(mockCartRepository.getByUserId).toHaveBeenCalledWith(1);
  });

  test("getByUserId throws an error when the argument is not a number", async () => {
    await expect(mockCartService.getByUserId()).rejects.toThrowError(
      UserIdNotDefinedError
    );
  });

  test("addProduct calls repository's addProduct mehtod", async () => {
    const cartId = 1;
    const productId = 1;
    const quantity = 1;
    await mockCartService.addProduct(cartId, productId, quantity);
    expect(mockCartRepository.addProduct).toHaveBeenCalledTimes(1);
    expect(mockCartRepository.addProduct).toHaveBeenCalledWith(
      cartId,
      productId,
      quantity
    );
  });

  test("removeProduct calls repository's addProduct method", async () => {
    const cartId = 1;
    const productId = 1;
    await mockCartService.removeProduct(cartId, productId);
    expect(mockCartRepository.removeProduct).toHaveBeenCalledTimes(1);
    expect(mockCartRepository.removeProduct).toHaveBeenCalledWith(
      cartId,
      productId
    );
  });

  test("changeQuantity calls repository's changeQuantity method", async () => {
    const cartId = 1;
    const productId = 1;
    const quantity = 1;
    await mockCartService.changeQuantity(cartId, productId, quantity);
    expect(mockCartRepository.changeQuantity).toHaveBeenCalledTimes(1);
    expect(mockCartRepository.changeQuantity).toHaveBeenCalledWith(
      cartId,
      productId,
      quantity
    );
  });

  test("merge adds new products to an existing cart", async () => {
    const products = [{ id: 1 }, { id: 2}];
    const cart = createCartTest(1, 1, products);

    const productsToMerge = [2, 3, 4];

    const res = await mockCartService.merge(cart, productsToMerge);
    expect(mockCartRepository.addProduct).toHaveBeenCalledTimes(2);
    expect(mockCartRepository.addProduct).toHaveBeenCalledWith(1, 3)
    expect(mockCartRepository.addProduct).toHaveBeenCalledWith(1, 4)
  });
});
