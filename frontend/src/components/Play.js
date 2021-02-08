import React from "react";
import Chessboard from "chessboardjsx";
import Grid from '@material-ui/core/Grid';
import GameChat from "./GameChat.js";

export default function Play(){
    return (
        <div style={{ padding: "10vw"}}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={3}>
                    <GameChat />
                </Grid>
                <Grid xs={6}>
                    <Chessboard position="start" />
                </Grid>
                <Grid item xs={3}>
                    <GameChat />
                </Grid>
            </Grid>   
        </div>
    );
}