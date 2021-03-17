import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(AuthContext);
  const history = useHistory();

  const handleMail = (e) => {
    setMail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (values) => {
    console.log(values);

    // const res = await fetch("http://localhost:5000/users/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    //   withCredentials: true,
    //   credentials: "include",
    // })
    // const data = await res.json();
    // if (res.status !== 200) {
    //   console.log(Object.values(data))
    //   setError(data.msg)
    //   return;
    // }
    // localStorage.setItem("token", data.token);
    // updateUser();
    // history.push('/')
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  bg-white px-7 py-5 rounded-sm border border-gray-300"
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

      <button className="bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-full inline mt-2 self-center focus:outline-none hover:bg-yellow-600 hover:text-white">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
