import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  const productList = products.map((product) => (
    <ProductCard key={product.id} model={product.model} price={product.price} brand={product.brand.name} image={product.image} discount={product.discount}/>
  ));

  return (
    <div className="product-container grid gap-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {productList}
    </div>
  );
};

export default ProductList;
