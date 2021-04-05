import { useParams } from "react-router";
import useSWR from "swr";
import ProductImage from "../components/product/ProductImage";

const ProductDetail = () => {
  let { productId } = useParams();
  const { data: product, error } = useSWR(`/products/${productId}`);

  if (error) return <div>Error</div>;
  if (!product) return <div>loading...</div>;

  return (
    <div className="container mx-auto max-w-screen-lg px-4 my-8">
      <div className="grid grid-cols-1 gap-4 bg-white shadow-md p-4 border border-gray-200 md:grid-cols-2">
        <div className="">
          <ProductImage filename={product.image} />
        </div>

        <div className="">
          <h4 className="text-2xl pb-3 border-b border-gray-200">
            {product.category.name} {product.brand.name} {product.model}
          </h4>
          <div className="mt-4">{product.description}</div>

          <div className="flex flex-col self-end justify-center items-center mt-4">
            <span className="text-2xl font-semibold text-blue-700">${product.price}</span>
            <button className="btn-primary mt-2">Add to cart</button>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default ProductDetail;