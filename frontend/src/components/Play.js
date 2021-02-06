import React from "react";
import Chessboard from "chessboardjsx";
import Grid from '@material-ui/core/Grid';

export default function Play(){
    return (
        <div style={{ padding: "10vw"}}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item>
                    {}
                </Grid>
                <Grid item >
                    <Chessboard position="start" />
                </Grid>
                <Grid item>
                    {}
                </Grid>
            </Grid>   
        </div>
    );
}