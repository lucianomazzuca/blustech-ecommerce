const CartController = require("../cartController");

const mockUserCart = {
  id: 1,
  createdAt: "2021-04-05T23:59:38.342Z",
  updatedAt: "2021-04-05T23:59:38.342Z",
  user_id: 1,
  products: [
    {
      id: 1,
      model: "RTX 3080",
      price: "200.00",
      description:
        "Lorem ipsum ",
      CartProduct: {
        id: 1,
        cart_id: 12,
        product_id: 3,
        quantity: 1,
      },
    },
  ],
};

const reqMock = {
  params: {
    id: 1
  }
};

const resMock = {
  json: jest.fn(),
  status: jest.fn(() => resMock),
};

const nextMock = jest.fn();

const mockCartService = {
  getByUserId: jest.fn(() => mockUserCart),
};

const mockCartController = new CartController({ cartService: mockCartService});

describe('CartController methods', () => {
  afterEach(() => {
    Object.values(mockCartService).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });

  test("getByUserId calls service's getByUserId method and returns a status 200 and an user cart as json", async () => {
    await mockCartController.getByUserId(reqMock, resMock, nextMock);

    const data = await mockCartService.getByUserId();
    
    expect(mockCartService.getByUserId).toHaveBeenCalledTimes(2);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(data);
  });
})