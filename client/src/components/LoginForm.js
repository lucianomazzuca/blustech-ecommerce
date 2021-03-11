import { useState } from "react";

const LoginForm = () => {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleMail = (e) => {
    setMail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:5000/users/login', {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
      withCredentials: true,
      credentials: 'include',
    }).then((data) => {
      console.log('sended', data);
    }).catch(e => console.log(e))
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">Mail</label>
      <input 
        type="Mail"
        value={email}
        onChange={handleMail}
      />
      <br/>
      <label htmlFor="">Password</label>
      <input 
        type="password"
        value={password}
        onChange={handlePassword}
      />
      <br/>
      <button>Log in</button>
    </form>
  );
}
 
export default LoginForm;