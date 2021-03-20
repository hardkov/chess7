import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Animation from "./utils/Animation";
import useAds from "../hooks/useAds";

const useStyles = makeStyles(() => ({
  ad: {
    width: "15vw",
  },
}));

const Ad = () => {
  const classes = useStyles();
  const ad = useAds(10000);

  return (
    <Animation onRender onUnRender duration={2}>
      <a href={ad.url}>
        <img className={classes.ad} src={ad.img} />
      </a>
    </Animation>
  );
};

export default Ad;
