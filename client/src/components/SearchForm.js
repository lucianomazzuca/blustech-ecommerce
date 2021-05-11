import { useState } from "react";

const SearchForm = ({ handleSearch, placeholder }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
      <form onSubmit={(e) => handleSearch(e, input)} className="relative">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="rounded-lg h-10 w-full p-2 shadow-md border border-gray-300 outline-none focus:ring"
        />
        <button className="absolute right-0 px-2">
          <svg
            className="h-10 w-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
  );
};

export default SearchForm;
