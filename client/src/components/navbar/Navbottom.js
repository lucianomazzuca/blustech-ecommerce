import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton';

const Navbottom = ({ currentUser, toggleMenu }) => {
  return (
    <div className="nav-bottom text-lg pb-4 flex justify-start" onClick={toggleMenu}>
      <nav className="links flex flex-col px-4">
        {
          !currentUser && 
          (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" >Register</Link>
            </>
          )
        } 
        {
          currentUser  && <LogoutButton />
        }
        
        <Link to="/cart">Cart</Link>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <a href="/">Categories</a>
        <a href="/">Brands</a>
      </nav>
    </div>
  );
};

export default Navbottom;
