import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { SWRConfig } from "swr";
import { axiosInstance } from "./axios";
import Routes from "./routes/Routes";

function App() {
  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher: (url) => axiosInstance.get(url).then((res) => res.data),
        }}
      >
        <div className="App min-h-screen flex flex-col">
          <Routes />
        </div>
      </SWRConfig>
    </AuthProvider>
  );
}

export default App;
