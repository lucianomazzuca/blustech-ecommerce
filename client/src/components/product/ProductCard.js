const ProductCard = ({}) => {
  return (
    <div className="product-card flex flex-col border-2 border-gray-200 rounded-lg overflow-hidden">
      <img src="http://localhost:5000/img/uploads/3080.jpg" alt="Product" className="w-full h-48 object-cover object-center"></img>
      <div className="card-content flex flex-col p-4 bg-white border-t border-gray-300">
        <h4 className="text-base font-semibold">RTX 3080</h4>
        <span className="text-lg">$350.000</span>
        <button className="bg-yellow-500 text-gray-900 w-20 font-semibold py-2 px-4 rounded-full inline mt-2 self-center hidden focus:outline-none hover:bg-yellow-600 hover:text-white">View</button>
      </div>
    </div>
  );
};

export default ProductCard;
