import useSWR from "swr";
import ProductList from "../components/product/ProductList";

const Home = () => {
  const { data, error } = useSWR("/products/");
  console.log(data);
  if (error) return <div>Error</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="container-general px-10 mb-4">
      <h3 className="title my-5 text-2xl">New Products</h3>
      <ProductList products={data.products} />
    </div>
  );
}
 
export default Home;