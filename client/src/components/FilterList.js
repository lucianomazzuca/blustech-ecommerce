import { useState } from "react";

const FilterList = ({ categories, brands, handleFilter }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (param, value) => {
    handleFilter(param, value);
    setIsActive(false);
  };

  const listCategories = categories.map((category) => (
    <li
      onClick={() => handleClick("category", category.id)}
      className="px-2 cursor-pointer hover:underline"
    >
      {category.name}
    </li>
  ));

  const listBrands = brands.map((brand) => (
    <li
      onClick={() => handleClick("brand", brand.id)}
      className="px-2 cursor-pointer hover:underline"
    >
      {brand.name}
    </li>
  ));

  return (
    <div>
      <button
        className="py-1 bg-white border border-indigo-300 w-full text-indigo-700 font-semibold focus:outline-none md:hidden"
        onClick={() => setIsActive(!isActive)}
      >
        Filter
      </button>

      <div className={`${isActive ? "flex flex-col filter-menu" : 'hidden filter-menu'}`}>
        <div className="bg-white pb-2  shadow-md overflow-hidden">
          <span className="px-2 p-y1 font-bold text-lg md:bg-yellow-500 md:block ">Categories</span>
          <ul className="text-gray-700">{listCategories}</ul>
        </div>
        <div className="bg-white shadow-md md:mt-4">
          <span className="px-2 py-1 font-bold text-lg md:bg-yellow-500 md:block ">Brands</span>
          <ul className="text-gray-700">{listBrands}</ul>
        </div>
      </div>
    </div>
  );
};

export default FilterList;
