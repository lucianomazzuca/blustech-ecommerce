const PaymentController = require("../paymentController");
const createProductTest = require("../../../product/controller/__test__/product.fixture");

const itemsMock = [
  {
    id: 1,
    title: "Nvidia RTX 3080",
    quantity: 1,
    unit_price: 100000,
  },
];

const productsMock = [createProductTest(1), createProductTest(2)];

const productsWithQuantity = [
  {
    id: 1,
    model: "Nvidia RTX 3080",
    quantity: 1,
    unit_price: 100000,
  },
];

const reqMock = {
  body: {
    productsIdAndQuantity: [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 1 },
    ],
  },
};

const resMock = {
  json: jest.fn(),
  status: jest.fn(() => resMock),
  sendStatus: jest.fn(),
};

const nextMock = jest.fn();

const mockPaymentService = {
  createPaymentMercadoPago: jest.fn(() => "link"),
  addQuantityToProducts: jest.fn(() => productsWithQuantity),
  mapProductsToItems: jest.fn(() => itemsMock),
};

const mockProductService = {
  getMany: jest.fn(() => productsMock),
};

const mockPaymentController = new PaymentController({
  paymentService: mockPaymentService,
  productService: mockProductService,
});

describe("Payment Controller methods", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getMercadoPagoLink process the products to buy and sends a payment link", async () => {
    await mockPaymentController.getMercadoPagoLink(reqMock, resMock);

    expect(mockProductService.getMany).toHaveBeenCalledTimes(1);
    expect(mockProductService.getMany).toHaveBeenCalledWith([1, 2]);

    expect(mockPaymentService.addQuantityToProducts).toHaveBeenCalledTimes(1);
    expect(mockPaymentService.addQuantityToProducts).toHaveBeenCalledWith(
      productsMock,
      reqMock.body.productsIdAndQuantity
    );

    expect(mockPaymentService.mapProductsToItems).toHaveBeenCalledTimes(1);
    expect(mockPaymentService.mapProductsToItems).toHaveBeenCalledWith(
      productsWithQuantity
    );

    expect(mockPaymentService.createPaymentMercadoPago).toHaveBeenCalledTimes(
      1
    );
    expect(mockPaymentService.createPaymentMercadoPago).toHaveBeenCalledWith(
      itemsMock
    );

    expect(resMock.json).toHaveBeenCalledWith("link");
  });

  test("getMercadoPagoLink sends a status of 400 when the request is empty", async () => {
    const emptyReq = { body: {} };

    await mockPaymentController.getMercadoPagoLink(emptyReq, resMock);
    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({msg: 'Empty cart'})
  });
});
