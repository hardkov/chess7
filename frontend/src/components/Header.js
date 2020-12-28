import React, { useState } from 'react';
import {AppBar, Toolbar, Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
}));

export default function Header(props){
    const [redirect, setRedirect] = useState(false);

    const classes = useStyles();
    
    

    return(
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={RouterLink} to="/">home</Button>
                <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                <Button color="inherit" component={RouterLink} to="/register">Register</Button>
                <Button color="inherit" component={RouterLink} to="/play">Play</Button>
                <Button color="inherit" component={RouterLink} to="/users">Users</Button>
                <Button color="inherit" component={RouterLink} to="/logout">Logout</Button>
            </Toolbar>
            </AppBar>
        </div>
    );
}