import LoginForm from "./components/LoginForm";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
        {/* <LoginForm /> */}
      </div>
    </Router>
  );
}

export default App;
