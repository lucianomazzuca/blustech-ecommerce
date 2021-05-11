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
    productId: 1
  },
  user: {
    id: 1,
    name: 'test'
  },
  query: {
    quantity: 1,
  },
  body: {
    productIds: [1, 2, 3]
  }
};

const resMock = {
  json: jest.fn(),
  status: jest.fn(() => resMock),
  sendStatus: jest.fn(),
};

const nextMock = jest.fn();

const mockCartService = {
  getByUserIdOrCreate: jest.fn(() => mockUserCart),
  addProduct: jest.fn(),
  removeProduct: jest.fn(),
  changeQuantity: jest.fn(),
  merge: jest.fn()
};

const mockCartController = new CartController({ cartService: mockCartService});

describe('CartController methods', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getByUserIdOrCreate calls service's getByUserIdOrCreate method and returns a status 200 and an user cart as json", async () => {
    await mockCartController.getByUserIdOrCreate(reqMock, resMock, nextMock);

    const data = await mockCartService.getByUserIdOrCreate();
    
    expect(mockCartService.getByUserIdOrCreate).toHaveBeenCalledTimes(2);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(data);
  });

  test("getByUserIdOrCreate calls next when service throws an error", async () => {
    mockCartService.getByUserIdOrCreate.mockImplementationOnce(() => {
      throw new Error();
    });

    await mockCartController.getByUserIdOrCreate(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("addProduct call's services addProduct method and returns responds with a status code of 201", async () => {
    await mockCartController.addProduct(reqMock, resMock, nextMock);

    expect(mockCartService.addProduct).toHaveBeenCalledTimes(1);
    expect(mockCartService.addProduct).toHaveBeenCalledWith(mockUserCart.id, reqMock.params.productId);
    expect(resMock.sendStatus).toHaveBeenCalledTimes(1);
    expect(resMock.sendStatus).toHaveBeenCalledWith(201);
  });

  test("addProduct call's next when a service's method throws an error", async () => {
    mockCartService.getByUserIdOrCreate.mockImplementationOnce(() => {
      throw new Error();
    });
    await mockCartController.addProduct(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("removeProduct calls services's getByUserIdOrCreate and removeProduct methods, then respons with a status of 200", async () => {
    await mockCartController.removeProduct(reqMock, resMock, nextMock);
    expect(mockCartService.getByUserIdOrCreate).toHaveBeenCalledTimes(1);
    expect(mockCartService.getByUserIdOrCreate).toHaveBeenCalledWith(reqMock.user.id);

    expect(mockCartService.removeProduct).toHaveBeenCalledTimes(1);
    expect(mockCartService.removeProduct).toHaveBeenCalledWith(mockUserCart.id, reqMock.params.productId);

    expect(resMock.sendStatus).toHaveBeenCalledWith(200);
  });

  test("removeProduct call's next when a service's method throws an error", async () => {
    mockCartService.getByUserIdOrCreate.mockImplementationOnce(() => {
      throw new Error();
    });
    await mockCartController.removeProduct(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("editProduct calls services's getByUserIdOrCreate and changeQuantity methods, then respons with a status of 200", async () =>{
    await mockCartController.editProduct(reqMock, resMock, nextMock);

    expect(mockCartService.getByUserIdOrCreate).toHaveBeenCalledTimes(1);
    expect(mockCartService.getByUserIdOrCreate).toHaveBeenCalledWith(reqMock.user.id);

    expect(mockCartService.changeQuantity).toHaveBeenCalledTimes(1);
    expect(mockCartService.changeQuantity).toHaveBeenCalledWith(mockUserCart.id, reqMock.params.productId, reqMock.query.quantity);

    expect(resMock.sendStatus).toHaveBeenCalledWith(200);
  });

  test("editProduct respons with status 400 when the quantity is less than 1", async () => {
    reqMock.query.quantity = 0
    await mockCartController.editProduct(reqMock, resMock, nextMock);
    expect(resMock.sendStatus).toHaveBeenCalledWith(400);

    reqMock.query.quantity = 1
  });

  test("editProduct call's next when a service's method throws an error", async () => {
    mockCartService.getByUserIdOrCreate.mockImplementationOnce(() => {
      throw new Error();
    });
    await mockCartController.editProduct(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  test("merge calls services's getByUserIdOrCreate and merge methods, then respons with a status of 200", async () => {
    await mockCartController.merge(reqMock, resMock, nextMock);

    expect(mockCartService.getByUserIdOrCreate).toHaveBeenCalledTimes(1);
    expect(mockCartService.getByUserIdOrCreate).toHaveBeenCalledWith(reqMock.user.id);

    expect(mockCartService.merge).toHaveBeenCalledTimes(1);
    expect(mockCartService.merge).toHaveBeenCalledWith(mockUserCart, reqMock.body.productIds);

    expect(resMock.sendStatus).toHaveBeenCalledWith(200);
  });

  test("merge call's next when a service's method throws an error", async () => {
    mockCartService.getByUserIdOrCreate.mockImplementationOnce(() => {
      throw new Error();
    });
    await mockCartController.merge(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
  });
})