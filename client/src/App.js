import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/footer/Footer";
import Register from "./pages/Register";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route path="/*">
                <NotFound />
              </Route>
            </Switch>
          </div>
          {/* <LoginForm /> */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
