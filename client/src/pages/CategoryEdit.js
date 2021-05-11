import CategoryForm from "../components/category/CategoryForm";
import { axiosInstance } from "../axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryEdit = () => {
  let { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/categories/${categoryId}`)
      .then(res => {
        setCategory(res.data);
      })
  }, [])

  return (
    <div className="container-general text-gray-900 mt-10">
      <h2 className="title text-3xl my-4 text-center">Edit Category</h2>
      {category ?  <CategoryForm previousValues={category} /> : ''} 
    </div>
  );
}

export default CategoryEdit;