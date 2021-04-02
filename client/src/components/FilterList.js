import { useState } from "react";

const FilterList = ({ categories, brands, handleFilter }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (param, value) => {
    handleFilter(param, value);
    setOpen(false);
  };

  const listCategories = categories.map((category) => (
    <li
      onClick={() => handleClick('category', category.id)}
      className="cursor-pointer hover:underline"
    >
      {category.name}
    </li>
  ));

  const listBrands = brands.map((brand) => (
    <li
    onClick={() => handleClick('brand', brand.id)}
    className="cursor-pointer hover:underline"
  >
    {brand.name}
  </li>
  ))

  return (
    <div>
      <button
        className="py-1 bg-white border border-indigo-300 w-full text-indigo-700 font-semibold focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        Filter
      </button>

      {open && (
        <div className="menu bg-white p-2 shadow-md">
          <span className="font-bold text-lg">Categories</span>
          <ul className="text-gray-700">{listCategories}</ul>
          <span className="font-bold text-lg mt-4">Brands</span>
          <ul className="text-gray-700">{listBrands}</ul>
        </div>
      )}
    </div>
  );
};

export default FilterList;
