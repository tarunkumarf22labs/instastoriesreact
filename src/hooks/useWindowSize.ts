import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Return true if the window width is greater than or equal to 440 pixels
  return {
    isSizeGreaterThan440: windowDimensions?.width >= 440,
    height: windowDimensions?.height,
  };
};
