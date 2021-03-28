import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { axiosAuth } from "../axios";
import BrandRow from "../components/brand/BrandRow";
import Pagination from "../components/pagination/Pagination";
import queryString from "query-string";
import SearchForm from "../components/SearchForm";

const BrandAdmin = () => {
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  let { page, term } = queryString.parse(search);
  
  const { data, error } = useSWR(`/brands?${searchParams}`);
  if (error) return <div>Error</div>;
  if (!data) return <div>loading...</div>;

  const handleDelete = async (id) => {
    try {
      await axiosAuth.delete(`/brands/${id}`);
      mutate(`/brands?page=${page}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageClick = (e) => {
    searchParams.set('page', e);
    history.push(`/admin/brands?${searchParams}`);
  };

  const handleSearch = (e, value) => {
    e.preventDefault();
    searchParams.set('term', value);
    history.push(`/admin/brands?page=1&term=${value}`);
  };


  const brandList = data.brands.map((brand) => (
    <BrandRow key={brand.id} brand={brand} handleDelete={handleDelete} />
  ));

  return (
    <div className="container-general mb-10">
      <h4 className="title">Brand List</h4>

      <Link
        to="/admin/brands/add"
        className="btn-primary mt-2 mb-5 inline-block"
      >
        Add New
      </Link>

      <SearchForm
        handleSearch={handleSearch}
      />

      {term && <div>{term}</div>}

      <div className="flex flex-col bg-white border border-gray-300 mt-6">
        <div className="font-bold border-b border-gray-500 grid grid-cols-12">
          <div className="col-span-1 p-2">ID</div>
          <div className="col-span-4 p-2">Name</div>
          <div className="col-span-4 p-2">Created</div>
          <div className="col-span-3 p-2">Actions</div>
        </div>

        <div className="">{brandList}</div>
      </div>

      <Pagination
        currentPage={Number(page)}
        itemsCountPerPage={15}
        itemCount={data.count}
        onClick={handlePageClick}
      />
    </div>
  );
};

export default BrandAdmin;
