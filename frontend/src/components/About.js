import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const About = () => {
  return (
    <Container component={Paper} elevation={3}>
      <Typography variant="overline" color="textPrimary">
        <Box fontWeight="fontWeightBold">About</Box>
      </Typography>
      <Typography color="textPrimary">
        Page you are seeing right now is my personal project. It features
        challenging people and watching live games. Technologies used for this
        project: Node.js, React, Socket.io and Jest for testing. Feel free to
        register and try it out!
      </Typography>
      <br />
    </Container>
  );
};

export default About;
