import { createContext } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const name = 'luciano'
  
  return (
    <ProductContext.Provider value={{name}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
