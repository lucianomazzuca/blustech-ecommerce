import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartCard from "../components/cart/CartCard";
import CartList from "../components/cart/CartList";

const Cart = () => {
  const { cart } = useContext(CartContext);
  console.log(cart);
  const list = cart.map((product) => (
    <CartCard
      key={product.id}
      model={product.model}
      category={product.category}
      brand={product.brands}
      price={product.price}
      image={product.image}
      quantity={product.CartProduct.quantity}
      discount={product.discount}
    />
  ));
  return (
    <div className="container mx-auto max-w-screen-md px-4 my-8">
      <h4 className="title">Cart</h4>

      <CartList products={cart} />
    </div>
  );
};

export default Cart;
