import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <div className="product-container grid gap-1 grid-cols-2 sm:grid-cols-3">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
 
export default ProductList;