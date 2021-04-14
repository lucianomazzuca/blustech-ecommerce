import CartProductCard from "./CartCard";

const CartList = ({ products, removeProduct, changeQuantity }) => {
  const list = products.map((product) => (
    <CartProductCard
      key={product.id}
      removeProduct={removeProduct}
      changeQuantity={changeQuantity}
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