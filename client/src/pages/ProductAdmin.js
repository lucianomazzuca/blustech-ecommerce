import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { axiosAuth } from "../axios";
import Pagination from "../components/pagination/Pagination";
import SearchForm from "../components/SearchForm";
import ProductRow from "../components/product/ProductRow";
import qs from "qs";

const ProductAdmin = () => {
  const history = useHistory();
  let query = qs.parse(useLocation().search, { ignoreQueryPrefix: true });
  let queryStringified = qs.stringify(query, { skipNulls: true });

  const { data, error } = useSWR(`/products?${queryStringified}`);
  if (error) return <div>Error</div>;
  if (!data) return <div>loading...</div>;

  const handleDelete = async (id) => {
    try {
      await axiosAuth.delete(`/products/${id}`);
      mutate(`/products?${queryStringified}`);
    } catch (err) {
      if (err.response.status === 403) {
        history.push("/");
      }
    }
  };

  const handlePageClick = (e) => {
    query.page = e;
    history.push(`/admin/products?${qs.stringify(query)}`);
  };

  const handleSearch = (e, value) => {
    e.preventDefault();
    query.term = value
    history.push(`/admin/products?page=1&term=${value}`);
  };

  const productList = data.products.map((product) => (
    <ProductRow
      key={product.id}
      product={product}
      handleDelete={handleDelete}
    />
  ));

  return (
    <div className="container-general mb-10">
      <h4 className="text-3xl mt-5 mb-4">Products</h4>

      <div className="flex justify-between">
        <SearchForm handleSearch={handleSearch} />
        <Link to="/admin/products/add" className="btn-primary p-4">
          Add New
        </Link>
      </div>

      {query.term && (
        <div className="font-semibold mt-4">
          Results for "<span className="italic font-normal">{query.term}</span>"
        </div>
      )}

      <div className="flex flex-col bg-white border border-gray-300 mt-6">
        <div className="font-bold border-b border-gray-500 grid grid-cols-12">
          <div className="col-span-1 p-2">ID</div>
          <div className="col-span-2 p-2">Image</div>
          <div className="col-span-2 p-2">Model</div>
          <div className="col-span-2 p-2">Brand</div>
          <div className="col-span-2 p-2">Category</div>
          <div className="col-span-2 p-2">Created</div>
          <div className="col-span-1 p-2">Actions</div>
        </div>

        <div>{productList}</div>
      </div>

      <Pagination
        currentPage={Number(query.page)}
        itemsCountPerPage={10}
        itemCount={data.count}
        onClick={handlePageClick}
      />
    </div>
  );
};

export default ProductAdmin;
