import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const AdminTab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div ref={ref} onClick={() => setIsOpen(!isOpen)}>
      <span className="hover:underline">Admin +</span>
      <div className={isOpen ? 'links absolute bg-black px-2 flex flex-col' : 'hidden'}>
        <Link to="/admin/products">Products</Link> 
        <Link to="/admin/Brands">Brands</Link> 
        <Link to="/admin/Categories">Categories</Link> 
      </div>
    </div>
  );
};

export default AdminTab;
