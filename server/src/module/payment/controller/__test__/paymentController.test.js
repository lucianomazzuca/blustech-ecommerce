const PaymentController = require("../paymentController");
const EmptyCartError = require("../../error/EmptyCartError");

const ordersMock = [
  { id: 1, quantity: 1 },
  { id: 2, quantity: 1 },
];

const itemsMock = [
  {
    id: 1,
    title: "Nvidia RTX 3080",
    quantity: 1,
    unit_price: 100000,
  },
];

const reqMock = {
  body: {
    productsIdAndQuantity: ordersMock,
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
};

const mockProductService = {
  getMany: jest.fn()
}

const mockPaymentController = new PaymentController({
  paymentService: mockPaymentService,
  productService: mockProductService
});

describe("Payment Controller methods", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getMercadoPagoLink calls service's getItemsForMercadoPago, createPaymentMercadoPago and sends a link", async () => {
    await mockPaymentController.getMercadoPagoLink(reqMock, resMock);

    expect(mockProductService.getMany).toHaveBeenCalledTimes(1);
    expect(mockProductService.getMany).toHaveBeenCalledWith([1, 2]);
  });


});
