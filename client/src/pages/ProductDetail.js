import { useParams } from "react-router";

const ProductDetail = () => {
  let { productId } = useParams();

  return (
    <div className="container-general">
      <div>{productId}</div>
    </div>
  );
}
 
export default ProductDetail;