import React from "react";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";
import { makeStyles, withStyles } from "@material-ui/core";
import useUserList from "../hooks/useUserList";

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

const useStyles = makeStyles({
  table: {
    width: "80%",
  },
});

export default function Users() {
  const classes = useStyles();
  const [userList, redirect, challangeSelectedPlayer] = useUserList();

  if (redirect) return <Redirect to="/play" />;

  if (userList == null) return <div />;

  return (
    <TableContainer className={classes.table} component={Paper} elevation={3}>
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
            <TableRow key={user.id}>
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
                  onClick={() => challangeSelectedPlayer(user.username)}
                >
                  Challange
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  orientation="vertical"
                  color="secondary"
                  aria-label="vertical outlined primary button group"
                  variant="contained"
                  onClick={() => console.log("Profile button clicked")}
                >
                  Profile
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
