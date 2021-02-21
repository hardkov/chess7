import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../helpers/auth";

export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() && restricted ? (
          <Redirect to="/users" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
