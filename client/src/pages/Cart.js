import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";

const Cart = () => {
  const { cart, removeProduct, changeQuantity, getProducts } = useContext(CartContext);
  const totalPrice = cart.reduce((accumulator, product) => {
    const price = Number(product.price);
    const quantity = product.quantity;
    const discount = product.discount;
    const realPrice = (price - (price * discount) / 100) * quantity;
    return accumulator + realPrice;
  }, 0);

  useEffect(() => {
    getProducts();
  }, [])
  
  return (
    <div className="container mx-auto max-w-screen-xl px-4 my-4 grid gap-4 grid-cols-1 lg:grid-cols-4">
      <h3 className="text-3xl col-span-4">Cart</h3>

      {cart.length > 0 ? (
        <>
          <div className="col-span-4 lg:col-span-3">
            <CartList
              products={cart}
              removeProduct={removeProduct}
              changeQuantity={changeQuantity}
            />
          </div>

          <div className="col-span-4 lg:col-span-1">
            <CartSummary total={totalPrice} />
          </div>
        </>
      ) : (
        "No products to show"
      )}
    </div>
  );
};

export default Cart;
