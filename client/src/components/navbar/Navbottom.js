import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton';

const Navbottom = ({ currentUser }) => {
  return (
    <div className="nav-bottom text-lg pb-4 flex justify-start">
      <nav className="links flex flex-col px-4">
        {
          !currentUser && (<Link to="/login"><span className="">Login</span></Link>)
        } 
        {
          currentUser  && <LogoutButton />
        }
        
        <a href="/">Cart</a>
        <Link to="/">Home</Link>
        <a href="/">Categories</a>
        <a href="/">Brands</a>
      </nav>
    </div>
  );
};

export default Navbottom;
