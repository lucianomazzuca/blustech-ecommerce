import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbottom = ({ currentUser, toggleMenu, displayLinks }) => {
  return (
    <div
      className={displayLinks ? "nav-bottom" : "nav-bottom hidden"}
      onClick={toggleMenu}
    >
      <nav className="links flex flex-col px-4 font-semibold lg:flex-row lg:space-x-4 lg:justify-center">
        {!currentUser && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {currentUser && <LogoutButton />}

        <Link to="/cart" className="lg:hidden">Cart</Link>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        {/* <a href="/">Categories</a>
        <a href="/">Brands</a> */}
      </nav>
    </div>
  );
};

export default Navbottom;
