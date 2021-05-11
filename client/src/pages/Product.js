import useSWR from "swr";
import ProductList from "../components/product/ProductList";
import Pagination from "../components/pagination/Pagination";
import FilterList from "../components/FilterList";
import qs from "qs";
import { useHistory, useLocation } from "react-router";

const Product = () => {
  const history = useHistory();

  let query = qs.parse(useLocation().search, { ignoreQueryPrefix: true });
  let queryStringified = qs.stringify(query, { skipNulls: true });

  const { data, error } = useSWR(`/products?${queryStringified}`);
  const { data: dataBrands, error: errorBrands } = useSWR(
    `/brands?limit=1000`,
    { revalidateOnFocus: false, refreshInterval: 0 }
  );
  const { data: dataCategories, error: errorCategories } = useSWR(
    `/categories?limit=1000`,
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );
  if (error || errorBrands || errorCategories) return <div>Error</div>;
  if (!data || !dataBrands || !dataCategories) return <div>loading...</div>;

  const handlePageClick = (e) => {
    query.page = e;
    history.push(`/products?${qs.stringify(query)}`);
  };

  const handleFilter = (param, value) => {
    query[param] = value;
    history.push(`/products?${qs.stringify(query)}`);
  };

  const resetFilter = () => {
    query.category = null;
    query.brand = null;
    query.term = null;

    history.push(`/products?${qs.stringify(query, { skipNulls: true })}`);
  };

  return (
    <div className="container-general px-10 mb-4">
      <h3 className="title">All Products</h3>

      {(query.category || query.brand || query.term) && (
        <button onClick={resetFilter} className="font-semibold underline mb-2">
          Reset Filter
        </button>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-5">
        <div className="col-span-5 md:col-span-1">
          <FilterList
            categories={dataCategories.categories}
            brands={dataBrands.brands}
            handleFilter={handleFilter}
            activeCategory={Number(query.category)}
            activeBrand={Number(query.brand)}
          />
        </div>

        <div className="col-span-5 md:col-span-3 xl:col-span-4">
          <ProductList products={data.products} />
          <Pagination
            currentPage={Number(query.page)}
            itemsCountPerPage={10}
            itemCount={data.count}
            onClick={handlePageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
