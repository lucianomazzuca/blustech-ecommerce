import { useHistory } from "react-router-dom";
import imgNotAvailable from "../../img/not_available.png";

const ProductCard = ({ id, model, price, brand, image, discount }) => {
  const history = useHistory();
  let imgSrc;

  if (process.env.REACT_APP_API_URL) {
    imgSrc = `${process.env.REACT_APP_API_URL}/img/uploads/${image}`;
  } else {
    imgSrc = `http://localhost:5000/img/uploads/${image}`;
  }

  const priceDiscount = (
    <div className="price">
      <div className="line-through">{price}</div>
      <span>${price - (price*discount)/100}</span>
    </div>
  );

  const onClick = () => {
    history.push(`/products/${id}`)
  }

  return (
      <article onClick={onClick} className="product-card relative flex flex-col border-2 border-gray-200 rounded-lg overflow-hidden">
        {discount > 0 && <div className="absolute text-sm bg-yellow-400 w-24 h-24 -top-12 -right-12 transform rotate-45 flex justify-center items-end ">
          {discount}% OFF
        </div>}
      
        <div className="img-container h-48">
          <img
            src={image ? imgSrc : imgNotAvailable}
            alt="Product"
            className="w-full h-48 object-cover object-center"
          ></img>
        </div>
        <div className="card-content flex flex-col justify-around p-4 bg-white border-t border-gray-300 h-full">
          <h4 className="text-base font-semibold">
            {brand} {model}
          </h4>
          {discount > 0 ? priceDiscount : <span>{price}</span>}
          <button className="btn-primary hidden md:inline">View</button>
        </div>
      </article>
  );
};

export default ProductCard;
