import React, { useState } from "react"
import {
    BrowserRouter as Router,
    Switch, 
    Route,
} from "react-router-dom";

import Registration from "./Registration.js";
import Header from "./Header.js";
import Home from "./Home.js";
import Login from "./Login.js";
import Play from "./Play.js";
import Users from "./Users.js";
import Logout from "./Logout.js";

export default function App(){
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleSuccessfulLogin = (data) => {
        setIsLoggedIn(true)
        setToken(data.accessToken);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setToken("");
    }

    return (
        <Router>
            <Header handleLogout={handleLogout}/>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        <Login handleSuccessfulLogin={handleSuccessfulLogin}/>
                    </Route>
                    <Route exact path="/register">
                        <Registration />
                    </Route>
                    <Route exact path="/play">
                        <Play />
                    </Route>
                    <Route exact path="/users">
                        <Users token={token} />
                    </Route>
                    <Route exact path="/logout">
                        <Logout handleLogout={handleLogout} />
                    </Route>
                </Switch>
        </Router>
    )
}

