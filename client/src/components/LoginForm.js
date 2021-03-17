import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from "react";
import { useHistory } from "react-router";

const LoginForm = () => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(AuthContext);
  const history = useHistory();

  const handleMail = (e) => {
    setMail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      withCredentials: true,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        updateUser()
        history.push('/')
      });
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex flex-col  bg-white px-7 py-5 rounded-sm border border-gray-300"
    >
      <label htmlFor="" className="text-gray-600">
        Email
      </label>
      <input
        type="Mail"
        value={email}
        onChange={handleMail}
        className="input"
      />
      <label htmlFor="">Password</label>
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        className="input"
      />
      <button className="bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-full inline mt-2 self-center focus:outline-none hover:bg-yellow-600 hover:text-white">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
