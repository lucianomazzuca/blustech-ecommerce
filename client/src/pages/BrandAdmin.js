import { useState } from 'react';
import { Link } from 'react-router-dom'
import useSWR from "swr";
import { axiosAuth } from '../axios';
import BrandRow from '../components/brand/BrandRow';
import Pagination from '../components/pagination/Pagination';

const BrandAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error } = useSWR(`/brands?page=${currentPage}`);
  if (error) return <div>Error</div>;
  if (!data) return <div>loading...</div>;

  const handleDelete = (id) => {
    try {
      axiosAuth.delete(`/brands/${id}`);
    } catch(err) {
      console.log(err)
    }
  }

  const brandList = data.brands.map((brand) => (
    <BrandRow key={brand.id} brand={brand} handleDelete={handleDelete} />
  ));

  return (
    <div className="container-general mb-10">
      <h4 className="title">Brand List</h4>

      <Link to="/admin/brands/add" className="btn-primary mt-2 mb-5 inline-block">Add New</Link>
      
      <div className="flex flex-col bg-white border border-gray-300">
        <div className="font-bold border-b border-gray-500 grid grid-cols-12">
          <div className="col-span-1 p-2">ID</div>
          <div className="col-span-4 p-2">Name</div>
          <div className="col-span-4 p-2">Created</div>
          <div className="col-span-3 p-2">Actions</div>
        </div>

        <div className="">{brandList}</div>
      </div>

      <Pagination currentPage={currentPage} itemsCountPerPage={15} itemCount={data.count} onClick={(e) => setCurrentPage(e)} />
    </div>
  );
};

export default BrandAdmin;
