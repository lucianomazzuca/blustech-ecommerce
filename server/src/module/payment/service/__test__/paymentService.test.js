const PaymentService = require("../paymentService");
const ArgumentIsNotArrayError = require("../../error/ArgumentIsNotArrayError");
const ArgumentIsEmptyError = require("../../../product/error/ArgumentIsEmpty");
const createProductTest = require("../../../product/controller/__test__/product.fixture");

const mockProducts = [{ id: 1, model: "Asus", price: 10000 }];

const mockProductRepository = {
  getMany: jest.fn(() => mockProducts),
};

const mercadopagoMock = {
  preferences: {
    create: jest.fn(() => {
      const response = {
        body: {
          id: "id",
        },
      };
      return response;
    }),
  },
};

const mockPaymentService = new PaymentService({
  productRepository: mockProductRepository,
  mercadopago: mercadopagoMock,
});

describe("Payment Service methods", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("addQuantityToProducts compares two arrays and adds quantity to the first based on id's", async () => {
    const products = [createProductTest(1), createProductTest(2)];
    const productsIdAndQuantity = [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 2 },
    ];

    const productsWithQuantity = mockPaymentService.addQuantityToProducts(
      products,
      productsIdAndQuantity
    );
    expect(productsWithQuantity[0].quantity).toEqual(1);
    expect(productsWithQuantity[1].quantity).toEqual(2);
  });

  test("createPaymentMercadoPago calls mercadopago's create method", async () => {
    const items = [{ id: 1, title: "test" }];
    const result = await mockPaymentService.createPaymentMercadoPago(items);

    expect(mercadopagoMock.preferences.create).toHaveBeenCalledTimes(1);
    expect(mercadopagoMock.preferences.create).toHaveBeenCalledWith({ items });

    expect(result).toEqual("id");
  });

  test("createPaymentMercadoPago throws an error when the argument is an empty array", async () => {
    const items = [];
    await expect(
      mockPaymentService.createPaymentMercadoPago(items)
    ).rejects.toThrowError(ArgumentIsEmptyError);
  });
});
