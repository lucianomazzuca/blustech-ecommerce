import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "../ErrorMsg";
import { axiosFileAuth } from "../../axios";
import setErrorFromServer from "../../utils/setErrorFromServer";
import axios from "axios";

const ProductForm = ({ previousValues, categories, brands }) => {
  const { register, handleSubmit, errors, setError } = useForm({
    defaultValues: previousValues,
  });
  const history = useHistory();

  const onSubmit = async (values) => {
    console.log(values)
    const formData = new FormData();
    // formData.append('image', values.image[0]);

    for (const key in values) {
      if (key === 'image') {
        console.log(key)
        formData.append(key, values[key][0]);
      } else {
        formData.append(key, values[key]);
      }
    }
    
    try {
      if (previousValues) {
        await axiosFileAuth.put(`/products/${previousValues.id}`, formData);
      } else {
        await axiosFileAuth.post("/products", formData);
      }
      // history.push("/admin/products");
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        history.push("/");
      } else {
        console.log(err.response)
        const errorServer = err.response.data.errors;
        setErrorFromServer(errorServer, setError);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="form-user"
    >
      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Model
        </label>

        <input
          name="model"
          ref={register}
          className="input"
        />
        {errors.model && <ErrorMsg error={errors.model.message} />}
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Category
        </label>

        <input
          name="category"
          ref={register}
          className="input"
        />
        {errors.category && <ErrorMsg error={errors.category.message} />}
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Brand
        </label>

        <input
          name="brand"
          ref={register}
          className="input"
        />
        {errors.brand && <ErrorMsg error={errors.brand.message} />}
      </div>

      <label htmlFor="" className="text-gray-600">
        Image
      </label>
      <input type="file" name="image" ref={register} />

      <button className="btn-primary px-10">Save</button>
    </form>
  );
};

export default ProductForm;
