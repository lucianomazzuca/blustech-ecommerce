import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "../ErrorMsg";
import { axiosInstance } from "../../axios";
import setErrorFromServer from "../../utils/setErrorFromServer";

const BrandForm = () => {
  const { register, handleSubmit, errors, setError } = useForm();
  const history = useHistory();

  const onSubmit = async (values) => {
    console.log(values)
    // try {
    //   await axiosInstance.post("/users/register", values);
    //   history.push('/login');
    // } catch (err) {
    //   if (err.response.data) {
    //     const errorServer = err.response.data;
    //     console.log(errorServer)
    //     setErrorFromServer(errorServer, setError);
    //   }
    // }
  };
  
  return (
    <form action="" className="form-user">
      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Name
        </label>

        <input
          type="Mail"
          name="name"
          ref={register({
            required: "Name is empty",
            minLength: {
              value: 3,
              message: "Name must have at least 5 characters",
            },
            maxLength: {
              value: 15,
              message: "Name must have less than 20 characters",
            },
          })}
          className="input"
        />
        {errors.name && <ErrorMsg error={errors.name.message} />}
      </div>
    </form>
  );
};

export default BrandForm;
