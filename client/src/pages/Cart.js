import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const list = cart.map(product => (
    <div>{product.model}</div>
  ))
  return (
    <div className="container-general">
      <h4 className="title">Cart</h4>

      {list}
    </div>
  );
}
 
export default Cart;