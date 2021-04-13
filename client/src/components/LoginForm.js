import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";
import { axiosInstance } from '../axios';

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [errorBackend, setErrorBackend] = useState(null);
  const { updateUser } = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      const data = await axiosInstance.post('/users/login', values);
      localStorage.setItem("token", data.data.token);
      updateUser();
      history.push('/')
    } catch (err) {
      if (err.response.data) {
        const errorServer = err.response.data;
        setErrorBackend(errorServer.msg)
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-user"
    >
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
      
      {errorBackend && <ErrorMsg error={errorBackend} />}
      
      <button className="bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-full inline mt-2 self-center focus:outline-none hover:bg-yellow-600 hover:text-white">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
