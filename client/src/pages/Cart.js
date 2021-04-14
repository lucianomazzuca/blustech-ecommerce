import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartCard from "../components/cart/CartCard";
import CartList from "../components/cart/CartList";

const Cart = () => {
  const { cart, removeProduct } = useContext(CartContext);

  return (
    <div className="container mx-auto max-w-screen-md px-4 my-8">
      <h4 className="title">Cart</h4>

      <CartList products={cart} removeProduct={removeProduct} />
    </div>
  );
};

export default Cart;
