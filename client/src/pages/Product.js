import useSWR from "swr";
import ProductList from "../components/product/ProductList";
import Pagination from "../components/pagination/Pagination";
import { useState } from "react";
import FilterList from "../components/FilterList";
import qs from 'qs';
import { useHistory, useLocation } from "react-router";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  let query = qs.parse(useLocation().search, { ignoreQueryPrefix: true });
  let queryStringified = qs.stringify(query, { skipNulls: true });

  const { data, error } = useSWR(`/products?page=${currentPage}`);
  const { data: dataBrands, error: errorBrands } = useSWR(`/brands?limit=1000`, {revalidateOnFocus: false, refreshInterval: 0});
  const { data: dataCategories, error: errorCategories} = useSWR(`/categories?limit=1000`, {revalidateOnFocus: false, refreshInterval: 0});
  if (error || errorBrands || errorCategories) return <div>Error</div>;
  if (!data || !dataBrands || !dataCategories) return <div>loading...</div>;

  const handlePageClick = (e) => {
    setCurrentPage(e);
  };

  const handleFilter = (param, value) => {
    query[param] = value
    history.push(`/products?${qs.stringify(query)}`);
  }

  return (
    <div className="container-general px-10 mb-4">
      <h3 className="title">All Products</h3>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">        
        <div className="">
          <FilterList categories={dataCategories.categories} brands={dataBrands.brands} handleFilter={handleFilter} />
        </div>
        
        <div className="col-span-3">
          <ProductList products={data.products} />
          <Pagination currentPage={query.page} itemsCountPerPage={10} itemCount={data.count} onClick={handlePageClick} />
        </div>
      </div>
    </div>
  );
};

export default Product;
