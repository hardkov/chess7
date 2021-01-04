import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({component: Component, computedMatch, exact, location, path, ...rest}){

    return (
        <Route computedMatch={computedMatch} exact={exact} location={location} path={path} render={props => (
            localStorage.getItem("TOKEN") ?
            <Component {...rest} {...props} />
            : <Redirect to="/login" />
        )} />
    );
};