import React, { useContext, useState, useEffect } from "react";
import { axiosAuth } from "../axios";
import { AuthContext } from "./AuthContext";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  
  async function getProducts() {
    if (currentUser) {
      const res = await axiosAuth.get(`/carts/${currentUser.id}`)
      setCart(res.data.products)
    } 
  }
  
    async function addProduct(productId) {
      if (currentUser) {
        const res = await axiosAuth.post(`/carts/add/${productId}`);
        console.log(res.data)
      }
    };
  
  useEffect( () => {
    getProducts()
  }, [currentUser])

  return (
    <CartContext.Provider value={{ cart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};
