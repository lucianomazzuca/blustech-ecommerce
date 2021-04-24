import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useClickAway } from "react-use";
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Navbottom from "./Navbottom";
import SearchForm from "../SearchForm";
import { useHistory } from "react-router";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayLinks, setDisplayLinks] = useState(false);
  const history = useHistory();

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setDisplayLinks(false);
  });

  const handleDropdown = () => {
    setDisplayLinks(!displayLinks);
  };

  const handleSearch = (e, term) => {
    e.preventDefault();
    history.push(`/products?page=1&term=${term}`);
  };

  return (
    <header ref={ref} className="bg-gray-900 text-white">
      <div className="container-general">
        <div className="nav-top py-4 flex space-x-4">
          <div className="logo-container text-4xl flex">
            <span className="logo leading-none text-yellow-500 md:hidden">
              B
            </span>
            <span className="logo leading-none text-yellow-500 hidden md:inline">
              BLUSTECH
            </span>
          </div>
          <div className="search-form flex-1 text-black ">
            {/* <form method="get" className="h-full">
              <input
                type="text"
                className="h-full text-black w-full rounded-lg px-2 text-lg focus:outline-none focus:shadow-inner"
              />
            </form> */}
            <SearchForm handleSearch={handleSearch} />
          </div>
          <div
            className="burger h-full flex justify-end items-center cursor-pointer"
            onClick={handleDropdown}
          >
            <svg
              className=" text-white h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className=""
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {displayLinks && (
          <Navbottom
            currentUser={currentUser}
            handleDropdown={handleDropdown}
            setDisplayLinks={setDisplayLinks}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
