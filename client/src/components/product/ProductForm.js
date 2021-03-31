import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "../ErrorMsg";
import { axiosFileAuth } from "../../axios";
import setErrorFromServer from "../../utils/setErrorFromServer";

const ProductForm = ({ previousValues, categories, brands }) => {
  const { register, handleSubmit, errors, setError } = useForm({
    defaultValues: previousValues || {
      price: 0,
      discount: 0
    },
  });
  const history = useHistory();

  const onSubmit = async (values) => {
    const formData = new FormData();

    for (const key in values) {
      if (key === "image") {
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
        return history.push("/");
      } 

      if (err.response.status === 400) {
        console.log(err.response);
        const errorServer = err.response.data.errors;
        setErrorFromServer(errorServer, setError);
      };
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

        <input name="model" ref={register} className="input" />
        {errors.model && <ErrorMsg error={errors.model.message} />}
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Description
        </label>

        <textarea name="description" ref={register} className="border border-gray-300 rounded-md" />
        {errors.description && <ErrorMsg error={errors.description.message} />}
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Brand
        </label>

        <select name="brand_id" ref={register} className="input">
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        {errors.brand && <ErrorMsg error={errors.brand.message} />}
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Category
        </label>

        <select name="category_id" ref={register} className="input">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <ErrorMsg error={errors.category.message} />}
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Price
        </label>

        <input name="price" type="number" ref={register} step="0.01" className="input" />
        {errors.price && <ErrorMsg error={errors.price.message} />}
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Discount
        </label>

        <input name="discount" type="number" ref={register} className="input" />
        {errors.discount && <ErrorMsg error={errors.discount.message} />}
      </div>

      <label htmlFor="" className="text-gray-600">
        Image
      </label>
      <input type="file" name="image" ref={register} accept="image/*" />

      <button className="btn-primary px-10">Save</button>
    </form>
  );
};

export default ProductForm;
