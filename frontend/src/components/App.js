import React, { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    Switch, 
} from "react-router-dom";

import Registration from "./Registration.js";
import Header from "./Header.js";
import Home from "./Home.js";
import Login from "./Login.js";
import Play from "./Play.js";
import Users from "./Users.js";
import Logout from "./Logout.js";
import PrivateRoute from "../utils/PrivateRoute.js";
import PublicRoute from "../utils/PublicRoute.js";

export default function App(){
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");

    const updateLoginState = (token, username) =>{
        if(token){
            localStorage.setItem("TOKEN", token);
            localStorage.setItem("USERNAME", username);
            setIsLogin(true)
            setUsername(username)
        } else {
            localStorage.removeItem("TOKEN");
            localStorage.removeItem("USERNAME");
            setIsLogin(false)
            setUsername("")    
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("TOKEN")
        const username = localStorage.getItem("USERNAME");
        
        if(token){
            setIsLogin(true)
            setUsername(username)
        } else{
            setIsLogin(false)
            setUsername("")
        }

    }, [])

    return (
        <Router>
            <Header isLogin={isLogin} username={username} />
                <Switch>
                    <PublicRoute component={Home} exact path="/" />
                    <PublicRoute restricted={true} component={Login} exact path="/login" updateLoginState={updateLoginState} />
                    <PublicRoute restricted={true} component={Registration} exact path="/register" updateLoginState={updateLoginState} />
                    <PrivateRoute component={Play} exact path="/play" />
                    <PrivateRoute component={Users} exact path="/users" />
                    <PrivateRoute component={Logout} exact path="/logout" updateLoginState={updateLoginState}/>
                </Switch>
        </Router>
    )
}

