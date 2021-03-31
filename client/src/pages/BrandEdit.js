import BrandForm from "../components/brand/BrandForm";
import { useForm } from "react-hook-form";
import ErrorMsg from "../components/ErrorMsg";
import { axiosAuth } from "../axios";
import setErrorFromServer from "../utils/setErrorFromServer";
import { axiosInstance } from "../axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BrandEdit = () => {
  let { brandId } = useParams();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/brands/${brandId}`)
      .then(res => {
        setBrand(res.data);
      })
  }, [])

  return (
    <div className="container-general text-gray-900 mt-10">
      <h2 className="title text-3xl my-4 text-center">Edit Brand</h2>
      {brand ?  <BrandForm previousValues={brand} /> : ''} 
    </div>
  );
}

export default BrandEdit;