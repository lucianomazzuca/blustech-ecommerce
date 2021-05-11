import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Navbottom from "./Navbottom";
import SearchForm from "../SearchForm";
import { useHistory } from "react-router";
import CartIcon from "../cart/CartIcon";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayLinks, setDisplayLinks] = useState(false);
  const history = useHistory();

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setDisplayLinks(false);
  });

  const toggleMenu = () => {
    setDisplayLinks(!displayLinks);
  };

  const handleSearch = (e, term) => {
    e.preventDefault();
    history.push(`/products?page=1&term=${term}`);
  };

  return (
    <header ref={ref} className="bg-gray-900 text-white">
      <div className="container-general">
        <div className="nav-top py-4 flex space-x-4 justify-around lg:pb-2">
          <div className="logo-container text-4xl flex lg:flex-1">
            <span className="logo leading-none text-yellow-500 md:hidden">
              B
            </span>
            <span className="logo leading-none text-yellow-500 hidden md:inline">
              BLUSTECH
            </span>
          </div>
          <div className="search-form flex-1 text-black">
            <SearchForm handleSearch={handleSearch} />
          </div>
          <div
            className="burger h-full flex justify-end items-center cursor-pointer lg:hidden lg:flex-1"
            onClick={toggleMenu}
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
          <CartIcon />
        </div>
        <Navbottom
          currentUser={currentUser}
          toggleMenu={toggleMenu}
          displayLinks={displayLinks}
          setDisplayLinks={setDisplayLinks}
        />
      </div>
    </header>
  );
};

export default Navbar;
