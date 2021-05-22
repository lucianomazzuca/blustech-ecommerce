const PaymentService = require("../paymentService");
const EmptyCartError = require("../../error/EmptyCartError");
const ArgumentIsNotArrayError = require("../../error/ArgumentIsNotArrayError");

const mockProducts = [{id: 1, model: 'Asus', price: 10000}]

const mockProductRepository = {
  getMany: jest.fn(() => mockProducts)
};

const mockPaymentService = new PaymentService({
  productRepository: mockProductRepository,
});

describe("Payment Service methods", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


});
