import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { axiosAuth } from "../axios";
import BrandRow from "../components/brand/BrandRow";
import Pagination from "../components/pagination/Pagination";
import queryString from "query-string";
import SearchForm from "../components/SearchForm";
import ProductRow from "../components/product/ProductRow";

const ProductAdmin = () => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  let { page, term } = queryString.parse(search);

  const { data, error } = useSWR(`/?${searchParams}`);
  if (error) return <div>Error</div>;
  if (!data) return <div>loading...</div>;

  const handleDelete = async (id) => {
    try {
      await axiosAuth.delete(`/products/${id}`);
      mutate(`/products?page=${page}`);
    } catch (err) {
      if (err.response.status === 403) {
        history.push('/');
      };
    }
  };

  const handlePageClick = (e) => {
    searchParams.set('page', e);
    history.push(`/admin/products?${searchParams}`);
  };

  const handleSearch = (e, value) => {
    e.preventDefault();
    searchParams.set('term', value);
    history.push(`/admin/products?page=1&term=${value}`);
  };

  const productList = data.products.map((product) => (
    <ProductRow key={product.id} product={product} handleDelete={handleDelete} />
  ));
  
  return (
    <div className="container-general mb-10">
      <h4 className="text-3xl mt-5 mb-4">Products</h4>
    </div>
  )

};

export default ProductAdmin;