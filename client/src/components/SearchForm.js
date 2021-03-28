import { useState } from "react";

const SearchForm = ({ handleSearch }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }
  
  return (
    <form onSubmit={(e) => handleSearch(e, input)}>
      <input type="text" value={input} onChange={handleInputChange} />
      <button className="btn-primary">Search</button>
    </form>
  );
}
 
export default SearchForm;