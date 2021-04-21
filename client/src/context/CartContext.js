import React, { useContext, useState, useEffect } from "react";
import { axiosAuth } from "../axios";
import { AuthContext } from "./AuthContext";
import { fromApi } from "../utils/cartProductMapper";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  let { currentUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  async function getProducts() {
    if (currentUser) {
      const res = await axiosAuth.get(`/carts/${currentUser.id}`);
      const products = res.data.products.map((product) => fromApi(product));
      setCart(products);
    } else {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        setCart(cart);
      }
      console.log(cart);
    }
  }

  async function addProduct(productId) {
    if (currentUser) {
      await axiosAuth.post(`/carts/product/${productId}`);
    } else {
      const { data: product } = await axiosAuth.get(`/products/${productId}`);
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        cart = [...cart, { ...product, quantity: 1 }];
      } else {
        cart = [{ ...product, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    getProducts();
  }

  async function removeProduct(productId) {
    if (currentUser) {
      await axiosAuth.delete(`/carts/product/${productId}`);
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const updatedCart = cart.filter((product) => product.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    getProducts();
  }

  async function changeQuantity(productId, quantity) {
    if (currentUser) {
      await axiosAuth.put(`/carts/product/${productId}?quantity=${quantity}`);
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const updatedCart = cart.map((product) => {
        if (product.id === productId) {
          product.quantity = quantity;
        }

        return product;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    getProducts();
  }

  useEffect(() => {
    getProducts();
  }, [currentUser]);

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, changeQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
