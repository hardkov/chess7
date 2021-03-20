import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const animate = (element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      duration: 1,
      opacity: 1,
    }
  );
};

const Animation = ({ children, onRender, onMount }) => {
  let componentRef = useRef(null);

  useEffect(() => {
    if (onMount) animate(componentRef);
  }, []);

  useEffect(() => {
    if (onRender) animate(componentRef);
  });

  return <div ref={(el) => (componentRef = el)}>{children}</div>;
};

export default Animation;
