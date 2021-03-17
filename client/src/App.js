import './App.css'
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
