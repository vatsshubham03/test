import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const isUserLoggedIn = true;

const PrivateRoute = ({ component: C, ...props }) => {
  return (
    <Route
      {...props}
      render={() => {
        return isUserLoggedIn ? (
          <C />
        ) : (
          <Switch>
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          </Switch>
        );
      }}
    />
  );
};

export default PrivateRoute;
