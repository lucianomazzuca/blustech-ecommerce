import { useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import ProductList from "../components/product/ProductList";

const Home = () => {

  return (
    <div className="container-general px-10 mb-4">
      <h3 className="title mt-8 text-2xl mb-4">New Products</h3>
      <ProductList />
    </div>
  );
}
 
export default Home;