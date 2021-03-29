import useSWR from "swr";
import Loading from "../components/Loading";
import ProductList from "../components/product/ProductList";


const Home = () => {
  const { data, error } = useSWR("/products/");
  console.log(data);
  if (error) return <div>Error</div>;
  if (!data) return <Loading className="mt-20" />;

  return (
    <div className="container-general flex flex-col items-center px-10 mb-4">
      <h3 className="title my-5 text-2xl">New Products</h3>
      <ProductList products={data.products} />
    </div>
  );
}
 
export default Home;