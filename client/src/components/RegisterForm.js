import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";

const RegisterForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="form-user"
    >
      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Name
        </label>

        <input
          type="Mail"
          name="name"
          ref={register({ required: "Name is empty" })}
          className="input"
        />
        {errors.name && <ErrorMsg error={errors.name.message} />}
      </div>
      
      <div className="form-group">
        <label htmlFor="" className="text-gray-600">
          Email
        </label>

        <input
          type="Mail"
          name="email"
          ref={register({ required: "Email is empty" })}
          className="input"
        />
        {errors.email && <ErrorMsg error={errors.email.message} />}
      </div>

      <div className="form-group">
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          ref={register({ required: "Password is empty" })}
          className="input"
        />
        {errors.password && <ErrorMsg error={errors.password.message} />}
      </div>

      <button className="bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-full inline mt-2 self-center focus:outline-none hover:bg-yellow-600 hover:text-white">
        Register
      </button>
      
    </form>
  );
};

export default RegisterForm;
