import ProductForm from "../components/product/ProductForm";
import useSWR from "swr";
import { useParams } from "react-router";
import { axiosInstance } from "../axios";
import { useEffect, useState } from "react";

const ProductEdit = () => {
  let { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/products/${productId}`)
      .then(res => {
        setProduct(res.data);
      });
  }, [])

  console.log(product)

  const { data: dataBrands, error: errorBrands } = useSWR(`/brands?limit=1000`, {revalidateOnFocus: false, refreshInterval: 0});
  const { data: dataCategories, error: errorCategories} = useSWR(`/categories?limit=1000`, {revalidateOnFocus: false, refreshInterval: 0});
  if (errorBrands || errorCategories) return <div>Error</div>;
  if (!dataBrands || !dataCategories) return <div>loading...</div>;
  

  
  return (
    <div className="container-general text-gray-900 mt-10">
      <h2 className="title text-3xl my-4 text-center">Edit Product</h2>
      <ProductForm categories={dataCategories.categories} brands={dataBrands.brands}/>
    </div>
  );
}

export default ProductEdit;