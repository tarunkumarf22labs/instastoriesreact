import { useEffect, useState } from "react";
import { getDataBasedOnPathname } from "../util/common";

const useStoriesData = (showReels) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "GET",
      };
      console.log('inside')
      const shop = window.Shopify?.shop?.split(".")[0] || "ekkatha";
      const data = await fetch(
        `https://s3.f22labs.cloud/shopclips/${shop}${showReels ? '-reels' : ''}.json`,
        requestOptions
      );
      const res = await data.json();
      console.log({res})
      const resolvedData= getDataBasedOnPathname(window.location.pathname, res)
      setData(resolvedData);
    };

    fetchData();
  }, []);

  return data;
};

export default useStoriesData;