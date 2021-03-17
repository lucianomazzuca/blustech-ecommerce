import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  
  const handleClick = () => {
    logout();
  }
  
  return (
    <button onClick={handleClick}>Log Out</button>
  );
}
 
export default LogoutButton;