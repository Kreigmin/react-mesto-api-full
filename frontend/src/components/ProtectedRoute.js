import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ path, loggedIn, children }) {
  return (
    <Route exact path={path}>
      {() => (loggedIn ? <>{children}</> : <Redirect to="/sign-in" />)}
    </Route>
  );
}

export default ProtectedRoute;
