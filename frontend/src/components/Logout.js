import React from "react";
import { Redirect } from "react-router-dom";

export default function Logout(props){
    props.handleLogout();

    return (
        <Redirect to="/" />
    );
}