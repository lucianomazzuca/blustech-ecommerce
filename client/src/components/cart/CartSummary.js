import checkout from '../../utils/checkout'

const CartSummary = ({ total }) => {  
  return (
    <div className="summary bg-white p-3 border border-gray-200 w-full max-w-sm mx-auto">
      <h4 className="text-xl">Summary</h4>
      <div className="border-t border-b border-gray-200 py-1 flex justify-between text-lg">
        <span>Total</span>
        <span>${total}</span>
      </div>
      <button onClick={checkout} className="checkout-btn bg-yellow-500 px-3 py-1">Checkout</button>
    </div>
  );
};

export default CartSummary;
