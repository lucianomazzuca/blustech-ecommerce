import { Link } from 'react-router-dom'

const Navbottom = () => {
  return (
    <div className="nav-bottom text-lg pb-4 flex justify-start">
      <nav className="links flex flex-col px-4">
        <Link to="/login"><span className="">Login</span></Link>
        <a href="/">Cart</a>
        <Link to="/">Home</Link>
        <a href="/">Categories</a>
        <a href="/">Brands</a>
      </nav>
    </div>
  );
};

export default Navbottom;
