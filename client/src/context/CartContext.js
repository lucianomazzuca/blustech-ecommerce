import React, { useContext, useState, useEffect } from "react";
import { axiosAuth } from "../axios";
import { AuthContext } from "./AuthContext";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  async function getProducts() {
    if (currentUser) {
      const res = await axiosAuth.get(`/carts/${currentUser.id}`);
      setCart(res.data.products);
    }
  }

  async function addProduct(productId) {
    if (currentUser) {
      const res = await axiosAuth.post(`/carts/product/${productId}`);
      getProducts();
    }
  }

  async function removeProduct(productId) {
    if (currentUser) {
      const res = await axiosAuth.delete(`/carts/product/${productId}`);
      getProducts();
    }
  }

  useEffect(() => {
    getProducts();
  }, [currentUser]);

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};
