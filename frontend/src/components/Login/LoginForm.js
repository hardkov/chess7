import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Animation from "../utils/Animation";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ({
  isLoading,
  errorMessage,
  handleCredentialsChange,
  handleSubmit,
}) => {
  const classes = useStyles();

  return (
    <Animation onMount>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
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
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container alignItems="flex-end" direction="column">
                <Grid item>
                  <Link component={RouterLink} to="/register">
                    Don&apos;t have an account? Register
                  </Link>
                </Grid>
                <Grid item>
                  <Typography color="error">{errorMessage}</Typography>
                </Grid>
              </Grid>
            </form>
          )}
        </div>
      </Container>
    </Animation>
  );
};

export default LoginForm;
