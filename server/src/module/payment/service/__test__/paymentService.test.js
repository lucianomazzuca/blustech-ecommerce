const PaymentService = require("../paymentService");
const EmptyCartError = require("../../error/EmptyCartError");
const ArgumentIsNotArrayError = require("../../error/ArgumentIsNotArrayError");
const createProductTest = require(
  "../../../product/controller/__test__/product.fixture"
);

const mockProducts = [{ id: 1, model: "Asus", price: 10000 }];

const mockProductRepository = {
  getMany: jest.fn(() => mockProducts),
};

const mockPaymentService = new PaymentService({
  productRepository: mockProductRepository,
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

    const productsWithQuantity = mockPaymentService.addQuantityToProducts(products, productsIdAndQuantity);
    console.log(productsWithQuantity)
    expect(productsWithQuantity[0].quantity).toEqual(1);
  });
});
