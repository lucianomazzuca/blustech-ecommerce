import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton';

const Navbottom = ({ currentUser, handleDropdown }) => {
  return (
    <div className="nav-bottom text-lg pb-4 flex justify-start" onClick={handleDropdown}>
      <nav className="links flex flex-col px-4">
        {
          !currentUser && 
          (
            <>
              <Link to="/login" onClick={handleDropdown}>Login</Link>
              <Link to="/register" onClick={handleDropdown}>Register</Link>
            </>
          )
        } 
        {
          currentUser  && <LogoutButton />
        }
        
        <Link to="/cart">Cart</Link>
        <Link to="/" onClick={handleDropdown}>Home</Link>
        <Link to="/products" onClick={handleDropdown}>Products</Link>
        <a href="/">Categories</a>
        <a href="/">Brands</a>
      </nav>
    </div>
  );
};

export default Navbottom;
