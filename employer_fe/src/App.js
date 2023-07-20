import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../src/history";
import PrivateRoute from "../src/Utils/private";
const Signup = lazy(() => import("./views/signup"))
const Login = lazy(() => import("./views/login"));
const Dashboard = lazy(() => import("./views/dashboard"));
const App = () => {
  return (
    <>
      <Suspense>
        <Router history={history}>
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
            <PrivateRoute exact path={"/"} component={Dashboard} />
          </Switch>
        </Router>
      </Suspense>
    </>
  );
};

export default App;
