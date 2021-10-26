import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reg" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
