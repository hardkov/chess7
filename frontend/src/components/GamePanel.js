import React from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

export default function GamePanel(props){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="center" direction="column">
                <Grid item >
                    <Typography>
                        Turn: {props.turn} 
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        Enemy: {props.enemy}
                    </Typography>
                </Grid>
                <Grid item>
                    <ButtonGroup 
                    fullWidth={ true }
                    size="large"
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical outlined primary button group"
                    variant="contained"
                    >
                        <Button>Rematch</Button>
                        <Button>New opponent</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </div>
    );
}