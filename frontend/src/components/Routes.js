import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import Play from "./Play";
import Logout from "./Logout";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

export default function Routes() {
  return (
    <Router>
      <Header />
      <Switch>
        <PublicRoute component={Home} exact path="/" />
        <PublicRoute restricted={true} component={Login} exact path="/login" />
        <PublicRoute
          restricted={true}
          component={Registration}
          exact
          path="/register"
        />
        <PrivateRoute component={Play} exact path="/play" />
        <PrivateRoute component={Logout} exact path="/logout" />
      </Switch>
    </Router>
  );
}
