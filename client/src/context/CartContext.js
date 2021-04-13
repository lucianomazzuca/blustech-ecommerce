import React, { useContext, useState, useEffect } from "react";
import { axiosAuth } from "../axios";
import { AuthContext } from "./AuthContext";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  console.log(currentUser)

  async function addProduct() {

  };

  async function getProducts() {
    if (currentUser) {
      const res = await axiosAuth.get(`/carts/${currentUser.id}`)
      setCart(res.data.products)
      console.log(res)
    }
  }


  useEffect( () => {
    getProducts()
    console.log('useeffect')
  }, [currentUser])

  return (
    <CartContext.Provider value={{ cart }}>
      {children}
    </CartContext.Provider>
  );
};
