import { useEffect, useState } from "react";

import chesscomAd from "../assets/chesscomAd.png";
import lichesscomAd from "../assets/lichesscomAd.jpeg";
import lichesscomAd2 from "../assets/lichesscomAd2.jpg";

const adsList = [
  { img: chesscomAd, url: "https://www.chess.com" },
  { img: lichesscomAd, url: "https://lichess.org" },
  { img: lichesscomAd2, url: "https://lichess.org" },
];

const useAds = (duration) => {
  const [adIdx, setAdIdx] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => setAdIdx((adIdx) => (adIdx + 1) % adsList.length),
      duration
    );

    return () => clearTimeout(timeout);
  });

  return adsList[adIdx];
};

export default useAds;
