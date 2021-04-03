import { useParams } from "react-router";
import useSWR from "swr";
import ProductImage from "../components/product/ProductImage";

const ProductDetail = () => {
  let { productId } = useParams();
  const { data: product, error } = useSWR(`/products/${productId}`);


  if (error) return <div>Error</div>;
  if (!product) return <div>loading...</div>;

  return (
    <div className="container-general">
      <div className="bg-white mt-8 shadow-md p-4 border border-gray-200">
        <h4 className="text-2xl pb-3 border-b border-gray-200">
          {product.category.name} {product.brand.name} {product.model}
        </h4>

          <div className="">
            <ProductImage filename={product.image} />
          </div>
      </div>
    </div>
  );
};

export default ProductDetail;
