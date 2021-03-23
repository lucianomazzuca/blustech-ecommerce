import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import Register from "../pages/Register";

const Routes = () => {
  return (
    <Router>
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
            <Route exact path="/products">
              <Product />
            </Route>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
    </Router>
  );
};

export default Routes;
