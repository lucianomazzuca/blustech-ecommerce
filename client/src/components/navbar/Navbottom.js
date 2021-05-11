import { Link } from "react-router-dom";
import AdminTab from "./AdminTab";
import LogoutButton from "./LogoutButton";

const Navbottom = ({ currentUser, toggleMenu, displayLinks }) => {
  return (
    <div
      className={displayLinks ? "nav-bottom" : "nav-bottom hidden"}
    >
      <nav className="links flex flex-col px-4 font-medium lg:flex-row lg:space-x-4 lg:justify-center">
        {!currentUser && (
          <>
            <Link to="/login" onClick={toggleMenu}>Login</Link>
            <Link to="/register" onClick={toggleMenu}>Register</Link>
          </>
        )}
        {currentUser && <LogoutButton />}
        <Link to="/cart" onClick={toggleMenu} className="lg:hidden">Cart</Link>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/products?page=1" onClick={toggleMenu}>Products</Link>
        {currentUser && currentUser.isAdmin && <AdminTab toggleMenu={toggleMenu}/>}
      </nav>
    </div>
  );
};

export default Navbottom;
