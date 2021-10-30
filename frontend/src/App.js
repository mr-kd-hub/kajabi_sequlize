import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import Course from "./pages/Course";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
require("dotenv").config();
function App() {
  const authState = useSelector((state) => state.authReducer);

  // console.log(authState.isValid);
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Route
            exact
            path="/"
            component={() => <Dashboard cmpName={"home"} />}
          />
        </Route>
        <Route
          exact
          path="/"
          component={() => <Dashboard cmpName={"home"} />}
        />
        <Route
          exact
          path="/course"
          component={() => <Dashboard cmpName={"course"} />}
        />
        <Route
          exact
          path="/offer"
          component={() => <Dashboard cmpName={"offer"} />}
        />
        <Route
          exact
          path="/customer"
          component={() => <Dashboard cmpName={"customer"} />}
        />
        <Route
          exact
          path="/coupan"
          component={() => <Dashboard cmpName={"coupan"} />}
        />
        <Route
          exact
          path="/course/:cid"
          component={() => (
            <Dashboard cmpName={"course"} subcmp={"subcourse"} />
          )}
        />
        <Route
          exact
          path="/course/subcourse/:sid"
          component={() => <Dashboard cmpName={"course"} subcmp={"content"} />}
        />

        <Route exact path="/login" component={Login} />
        <Route exact path="/reg" component={Signup} />
        <Route path="*">404! No Page Found</Route>
      </Switch>
    </div>
  );
}

export default App;
