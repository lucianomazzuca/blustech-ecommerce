const Navbar = () => {
  return (
    <header className="py-3 px-2 bg-gray-900 h-16 flex space-x-4">
      <div className="logo text-white text-4xl flex">
        <span className="inline-block leading-none">B</span>
      </div>
      <div className="search-form flex-1">
        <form method="get" className="h-full">
          <input type="text" className="h-full w-full rounded-lg px-2 text-lg focus:outline-none focus:shadow-inner"/>
        </form>
      </div>
      <div className="burger h-full flex justify-end items-center">
        <svg className=" text-white h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path className="" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </header>
  );
}
 
export default Navbar;