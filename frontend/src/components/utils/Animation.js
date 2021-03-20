import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const animate = (element, duration) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      duration: duration,
      opacity: 1,
    }
  );
};

const Animation = ({ children, onRender, onMount, duration = 1 }) => {
  let componentRef = useRef(null);

  useEffect(() => {
    if (onMount) animate(componentRef, duration);
  }, []);

  useEffect(() => {
    if (onRender) animate(componentRef, duration);
  });

  return <div ref={(el) => (componentRef = el)}>{children}</div>;
};

export default Animation;
