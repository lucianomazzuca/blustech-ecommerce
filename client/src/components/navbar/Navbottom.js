import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton';

const Navbottom = ({ currentUser, handleDropdown }) => {
  return (
    <div className="nav-bottom text-lg pb-4 flex justify-start">
      <nav className="links flex flex-col px-4">
        {
          !currentUser && (<Link to="/login" onClick={handleDropdown}>Login</Link>)
        } 
        {
          currentUser  && <LogoutButton />
        }
        
        <a href="/">Cart</a>
        <Link to="/" onClick={handleDropdown}>Home</Link>
        <a href="/">Categories</a>
        <a href="/">Brands</a>
      </nav>
    </div>
  );
};

export default Navbottom;
