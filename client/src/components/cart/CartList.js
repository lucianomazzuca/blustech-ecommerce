import CartProductCard from "./CartCard";

const CartList = ({ products, removeProduct }) => {
  const list = products.map((product) => (
    <CartProductCard
      key={product.id}
      removeProduct={removeProduct}
      id={product.id}
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
    <>
      {list}
    </>
  );
}
 
export default CartList;