import BrandForm from "../components/brand/BrandForm";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "../components/ErrorMsg";
import { axiosAuth } from "../axios";
import setErrorFromServer from "../utils/setErrorFromServer";

const BrandAdd = () => {
  const { register, handleSubmit, errors, setError } = useForm();
  const history = useHistory();
  
  const onSubmit = async (values) => {
    try {
      await axiosAuth.post("/brands", values);
      history.push('/admin/brands');
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        return history.push("/");
      }

      const errorServer = err.response.data.errors;
      setErrorFromServer(errorServer, setError);
    }
  };
  
  return (
    <div className="container-general text-gray-900 mt-10">
      <h2 className="title text-3xl my-4 text-center">Add New Brand</h2>
      <BrandForm  />
    </div>
  );
}

export default BrandAdd;