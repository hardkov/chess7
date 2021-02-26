import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const animate = (element) => {
  gsap.from(element, {
    duration: 1,
    y: -200,
    opacity: 0,
  });
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
