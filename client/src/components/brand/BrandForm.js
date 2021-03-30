import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "../ErrorMsg";
import { axiosAuth } from "../../axios";
import setErrorFromServer from "../../utils/setErrorFromServer";

const BrandForm = ({ previousValues }) => {
  const { register, handleSubmit, errors, setError } = useForm({
    defaultValues: previousValues
  });
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      if (previousValues) {
        await axiosAuth.put(`/brands/${previousValues.id}`, values);
      } else {
        await axiosAuth.post("/brands", values);
      }
      history.push('/admin/brands');
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        history.push("/");
      } else {
        const errorServer = err.response.data.errors;
        setErrorFromServer(errorServer, setError);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-user">
      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Name
        </label>

        <input
          name="name"
          ref={register({
            required: "Name is empty",
          })}
          className="input"
        />
        {errors.name && <ErrorMsg error={errors.name.message} />}
      </div>

      <button className="btn-primary px-10">Save</button>
    </form>
  );
};

export default BrandForm;
