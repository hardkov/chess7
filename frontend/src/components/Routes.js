import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Home.js";
import Registration from "./Registration/Registration.js";
import Login from "./Login/Login.js";
import Play from "./Play/Play.js";
import Logout from "./Logout.js";
import PrivateRoute from "./utils/PrivateRoute.js";
import PublicRoute from "./utils/PublicRoute.js";

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
