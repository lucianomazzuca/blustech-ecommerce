import ProductForm from "../components/product/ProductForm";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "../components/ErrorMsg";
import { axiosFileAuth } from "../axios";
import setErrorFromServer from "../utils/setErrorFromServer";
import useSWR from "swr";

const ProductAdd = () => {
  const { data: dataBrands, error: errorBrands } = useSWR(`/brands`);
  const { data: dataCategories, error: errorCategories} = useSWR(`/categories`);
  if (errorBrands || errorCategories) return <div>Error</div>;
  if (!dataBrands && !dataCategories) return <div>loading...</div>;
  
  return (
    <div className="container-general text-gray-900 mt-10">
      <h2 className="title text-3xl my-4 text-center">Add New Product</h2>
      <ProductForm  />
    </div>
  );
}

export default ProductAdd;