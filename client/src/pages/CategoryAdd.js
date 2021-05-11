import CategoryForm from "../components/category/CategoryForm";

const CategoryAdd = () => {
  return (
    <div className="container-general text-gray-900 mt-10">
      <h2 className="title text-3xl my-4 text-center">Add New Category</h2>
      <CategoryForm  />
    </div>
  );
}

export default CategoryAdd;