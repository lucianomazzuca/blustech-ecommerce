import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { SWRConfig } from "swr";
import { axiosInstance } from "./axios";
import Routes from "./routes/Routes";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SWRConfig
          value={{
            fetcher: (url) => axiosInstance.get(url).then((res) => res.data),
          }}
        >
          <div className="App min-h-screen flex flex-col">
            <Routes />
          </div>
        </SWRConfig>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
