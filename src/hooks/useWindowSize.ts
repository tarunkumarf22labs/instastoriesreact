import { useState, useEffect } from 'react';

export const useWindowWidth =() => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Return true if the window width is greater than or equal to 440 pixels
  return windowWidth >= 440;
}


