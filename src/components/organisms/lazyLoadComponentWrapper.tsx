import React from "react";
import { useInView } from "react-intersection-observer";

function LazyLoadComponentWrapper({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px 5px 0px", // Adjust this margin as needed
  });

  return <div ref={ref}>{inView ? children : null}</div>;
}

export default LazyLoadComponentWrapper;
