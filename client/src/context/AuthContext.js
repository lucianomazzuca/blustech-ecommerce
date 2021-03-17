import React, { useContext, useState, useEffect } from "react";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  function checkUser() {
    // Check token in localMemory then fetch user data
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:5000/users/me', {
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log("checkToken", data)
      setCurrentUser({ email: data.email, name: data.name })
    })
    .catch(err => console.log(err))
  }

  function logout() {
    localStorage.removeItem('token');
    setCurrentUser(null)
  }

  useEffect(() => {
    checkUser();
  }, []);
  
  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
 