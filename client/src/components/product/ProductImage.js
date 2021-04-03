import { useState } from "react";
import imgNotAvailable from "../../img/not_available.png";

const ProductImage = ({ filename }) => {
  // const res = await axiosInstance(`/img/uploads/${product.image}`);
  // console.log(res);
  let imgSrc;

  if (process.env.REACT_APP_API_URL) {
    imgSrc = `${process.env.REACT_APP_API_URL}/img/uploads/${filename}`;
  } else {
    imgSrc = `http://localhost:5000/img/uploads/${filename}`;
  }

  const [error, setError] = useState(false);

  return (
    <img
      src={!error ? imgSrc : imgNotAvailable}
      onError={() => setError(true)}
      alt="Product"
      className="object-cover object-center w-full h-full"
    />
  );
};

export default ProductImage;
