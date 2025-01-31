import React from "react";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";
import { withStyles, Snackbar } from "@material-ui/core";

import useUserList from "../hooks/useUserList";

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

const useStyles = makeStyles((theme) => ({
  snackbar: {
    backgroundColor: theme.palette.error.light,
  },
}));

export default function Users() {
  const classes = useStyles();
  const [
    userList,
    redirect,
    error,
    off,
    challengeSelectedPlayer,
  ] = useUserList();

  if (redirect) return <Redirect to="/play" />;

  if (userList == null) return <div />;

  return (
    <>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="overline" color="textPrimary">
                  <Box fontWeight="fontWeightBold">User</Box>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Typography color="textSecondary">{user.username}</Typography>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    orientation="vertical"
                    color="secondary"
                    aria-label="vertical outlined primary button group"
                    variant="contained"
                    onClick={() => challengeSelectedPlayer(user.username)}
                  >
                    Challenge
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        autoHideDuration={6000}
        open={error.occured}
        onClose={off}
        ContentProps={{
          className: classes.snackbar,
        }}
        message={error.message}
      />
    </>
  );
}
