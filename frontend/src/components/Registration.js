import React, { useState } from 'react';
import {Link as RouterLink, Redirect} from "react-router-dom";
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Registration(props) {
  const [redirect, setRedirect] = useState(false);
  const [credentials, setCredentials] = useState({username: "", password: ""});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsChange = (event) => {
      setCredentials({
          ...credentials,
          [event.target.name]: event.target.value
      })
  }

  const handleSubmit = async (event) => {
    setIsLoading(true);

    try {
      let response = await axios.post(
          'http://localhost:5000/user/register',
          {
              username: credentials.username,
              password: credentials.password
          }
      )

      if(response.status === 201){
          setRedirect(true);
          props.updateLoginState(response.data.accessToken, credentials.username);
      }
    } catch(error){
        setErrorMessage("Registration error");
    }
    console.log("registerr")
    setIsLoading(false);
  }


  const classes = useStyles();

  if(redirect){
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {
          isLoading ?

          <CircularProgress /> :

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={handleCredentialsChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleCredentialsChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={ classes.submit }
              
            >
              Register
            </Button>
            <Grid container alignItems="flex-end" direction="column">
              <Grid item>
                <Link component={RouterLink} to="/login">
                  Already have an account? Login
                </Link>
              </Grid>
              <Grid>
                <Typography color="error">
                  {errorMessage}
                </Typography>
              </Grid>
            </Grid>
          </form>
        }      
    </div>
    </Container>
  );
}