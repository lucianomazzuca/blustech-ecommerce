import { useState } from 'react';
import Navbottom from './Navbottom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleDropdown = () => {
    setOpen(!open)
  }
  
  return (
    <header className="bg-gray-900 text-white">
      <div className="container-general">
        <div className="nav-top py-4 flex space-x-4">
          <div className="logo text-4xl flex">
            <span className="leading-none text-yellow-500 md:hidden">B</span>
            <span className="leading-none text-yellow-500 hidden md:inline">BLUSTECH</span>
          </div>
          <div className="search-form flex-1">
            <form method="get" className="h-full">
              <input type="text" className="h-full w-full rounded-lg px-2 text-lg focus:outline-none focus:shadow-inner"/>
            </form>
          </div>
          <div className="burger h-full flex justify-end items-center cursor-pointer" onClick={handleDropdown}>
            <svg className=" text-white h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path className="" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        {open && <Navbottom />}
      </div>
    </header>
  );
}
 
export default Navbar;