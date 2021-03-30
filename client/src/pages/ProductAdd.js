import ProductForm from "../components/product/ProductForm";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "../components/ErrorMsg";
import { axiosFileAuth } from "../axios";
import setErrorFromServer from "../utils/setErrorFromServer";

const ProductAdd = () => {
  const { register, handleSubmit, errors, setError } = useForm();
  const history = useHistory();
  
  const onSubmit = async (values) => {
    
    try {
      await axiosFileAuth.post("/products", values);
      history.push('/admin/products');
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        return history.push("/");
      }
      console.log(err.response)
      const errorServer = err.response.data.errors;
      setErrorFromServer(errorServer, setError);
    }
  };
  
  return (
    <div className="container-general text-gray-900 mt-10">
      <h2 className="title text-3xl my-4 text-center">Add New Product</h2>
      <ProductForm  />
    </div>
  );
}

export default ProductAdd;