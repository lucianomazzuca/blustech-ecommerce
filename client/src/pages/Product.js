import useSWR from "swr";
import ProductList from "../components/product/ProductList";
import Pagination from "../components/pagination/Pagination";
import { useState } from "react";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error } = useSWR(`/products?page=${currentPage}`);
  if (error) return <div>Error</div>;
  if (!data) return <div>loading...</div>;

  const handlePageClick = (e) => {
    console.log(e);
    setCurrentPage(e);
  };

  return (
    <div className="container-general px-10 mb-4">
      <h3 className="title my-5 text-2xl">All Products</h3>
      <ProductList products={data.products} />

      <Pagination currentPage={currentPage} itemCount={data.count} onClick={handlePageClick} />
    </div>
  );
};

export default Product;
