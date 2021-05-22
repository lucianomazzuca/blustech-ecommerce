const Item = require("../../entity/item");
const { fromProductToItemMP } = require("../paymentMapper");

describe("Payment mappers", () => {
  test("fromProductToItemMP maps a Product Entity to an Item entity", async () => {
    const product = {
      id: 1,
      model: 'RTX 3080',
      discount: 20,
      price: 100,
    }

    const quantity = 1

    const item = fromProductToItemMP({...product, quantity});
    expect(item).toBeInstanceOf(Item);
    expect(item.id).toEqual(1);
    expect(item.quantity).toEqual(1);
    expect(item.unit_price).toEqual(80)
  });
});
