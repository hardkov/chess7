import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PublicRoute({component: Component, restricted, computedMatch, exact, location, path, ...rest}){

    return (
        <Route computedMatch={computedMatch} exact={exact} location={location} path={path} render={props => (
            localStorage.getItem("TOKEN") && restricted ?
                <Redirect to="/users" />
            : <Component {...rest} {...props} />
        )} />
    );
};
