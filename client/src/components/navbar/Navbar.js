import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useClickAway } from "react-use";
import Navbottom from "./Navbottom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayLinks, setDisplayLinks] = useState(false);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setDisplayLinks(false);
  });

  const handleDropdown = () => {
    setDisplayLinks(!displayLinks);
  };

  return (
    <header ref={ref} className="bg-gray-900 text-white">
      <div className="container-general" >
        <div  className="nav-top py-4 flex space-x-4">
          <div className="logo text-4xl flex">
            <span className="leading-none text-yellow-500 md:hidden">B</span>
            <span className="leading-none text-yellow-500 hidden md:inline">
              BLUSTECH
            </span>
          </div>
          <div className="search-form flex-1">
            <form method="get" className="h-full">
              <input
                type="text"
                className="h-full w-full rounded-lg px-2 text-lg focus:outline-none focus:shadow-inner"
              />
            </form>
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
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
