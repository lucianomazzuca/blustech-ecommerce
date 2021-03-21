import imgNotAvailable from '../../img/not_available.png';

const ProductCard = ({ model, price, brand, image }) => {
  let imgSrc;
  
  if (process.env.REACT_APP_API_URL) {
    imgSrc = `${process.env.REACT_APP_API_URL}/img/uploads/${image}`;
  } else {
    imgSrc = `http://localhost:5000/img/uploads/${image}`
  }
  
  return (
    <div className="product-card flex flex-col border-2 border-gray-200 rounded-lg overflow-hidden">
      <img
        src={image ? imgSrc : imgNotAvailable}
        alt="Product"
        className="w-full h-48 object-cover object-center"
      ></img>
      <div className="card-content flex flex-col p-4 bg-white border-t border-gray-300">
        <h4 className="text-base font-semibold">{brand} {model}</h4>
        <span className="text-lg">${price}</span>
        <button className="bg-yellow-500 text-gray-900 w-16 font-semibold py-1 px-2 rounded-full mt-2 self-center hidden focus:outline-none hover:bg-yellow-600 hover:text-white md:inline">
          View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
