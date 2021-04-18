import ProductImage from "../product/ProductImage";

const CartProductCard = ({
  removeProduct,
  changeQuantity,
  id,
  model,
  brand,
  category,
  price,
  image,
  quantity,
  discount,
}) => {
  return (
    <div className="border border-gray-300 bg-white shadow-sm p-2 grid gap-3 grid-cols-12 ">
      <div className=" h-20 col-span-4 md:col-span-3 md:h-28">
        <ProductImage filename={image} />
      </div>
      <div className="col-span-8 flex items-center text-lg md:col-span-4 overflow-ellipsis overflow-hidden ">
        {model}
      </div>
      <div className="col-span-4 flex items-center text-lg md:col-span-2">
        <div className="flex justify-between w-24 space-x-2 border rounded-md border-gray-300 ">
          <button
            onClick={() => changeQuantity(id, quantity - 1)}
            className="w-7 px-2 bg-gray-200 focus:outline-none"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => changeQuantity(id, quantity + 1)}
            className="w-7 flex items-center justify-center px-2 bg-gray-200 focus:outline-none"
          >
            +
          </button>
        </div>
      </div>
      <div className="col-span-4 text-xl font-semibold flex justify-center items-center md:col-span-2">
        ${(price - (price * discount) / 100) * quantity}
      </div>
      <button
        onClick={() => removeProduct(id)}
        className="col-span-4 flex justify-center items-center md:col-span-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartProductCard;
