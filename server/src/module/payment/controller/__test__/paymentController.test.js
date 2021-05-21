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
    productsToBuy: ordersMock,
  },
};

const resMock = {
  json: jest.fn(),
  status: jest.fn(() => resMock),
  sendStatus: jest.fn(),
};

const nextMock = jest.fn();

const mockPaymentService = {
  getItemsForMercadoPago: jest.fn(() => itemsMock),
  createPaymentMercadoPago: jest.fn(() => "link"),
};

const mockPaymentController = new PaymentController({
  paymentService: mockPaymentService,
});

describe("Payment Controller methods", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getMercadoPagoLink calls service's getItemsForMercadoPago, createPaymentMercadoPago and sends a link", async () => {
    await mockPaymentController.getMercadoPagoLink(reqMock, resMock);

    expect(mockPaymentService.getItemsForMercadoPago).toHaveBeenCalledTimes(1);
    expect(mockPaymentService.getItemsForMercadoPago).toHaveBeenCalledWith(
      ordersMock
    );

    expect(mockPaymentService.createPaymentMercadoPago).toHaveBeenCalledTimes(
      1
    );
    expect(mockPaymentService.createPaymentMercadoPago).toHaveBeenCalledWith(
      itemsMock
    );

    expect(resMock.json).toHaveBeenCalledWith("link");
  });

  test("getMercadoPagoLink sends error 400 when the cart is empty", async () => {
    mockPaymentService.getItemsForMercadoPago.mockImplementationOnce(() => {
      throw new EmptyCartError();
    });

    await mockPaymentController.getMercadoPagoLink(reqMock, resMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({ msg: "Empty cart" });
  });
});
