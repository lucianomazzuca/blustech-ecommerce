import React, { useContext, useState, useEffect } from "react";
import { axiosAuth } from "../axios";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function updateUser() {
    // Check token in localMemory then fetch user data
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUser(null)
      return setIsLoading(false);
    };

    try{
      const res = await axiosAuth.get('/users/me');
      const data = res.data;
      setCurrentUser({ id: data.id, email: data.email, name: data.name, isAdmin: data.isAdmin });
      setIsLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
      }
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setCurrentUser(null)
  }

  useEffect(() => {
    updateUser();
  }, []);
  
  return (
    <AuthContext.Provider value={{ currentUser, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
 