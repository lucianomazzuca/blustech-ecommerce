import CategoryForm from "../components/category/CategoryForm";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { axiosAuth } from "../axios";
import setErrorFromServer from "../utils/setErrorFromServer";

const CategoryAdd = () => {
  const { register, handleSubmit, errors, setError } = useForm();
  const history = useHistory();
  
  const onSubmit = async (values) => {
    try {
      await axiosAuth.post("/categories", values);
      history.push('/admin/categories');
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
      <h2 className="title text-3xl my-4 text-center">Add New Category</h2>
      <CategoryForm  />
    </div>
  );
}

export default CategoryAdd;