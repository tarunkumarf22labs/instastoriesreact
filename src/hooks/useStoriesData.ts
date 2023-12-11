import { useEffect, useState } from "react";
import { getDataBasedOnPathname } from "../util/common";

const useStoriesData = (showReels) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "GET",
      };
      
      const shop = window.Shopify?.shop?.split(".")[0] || "magic-pluss";
      const data = await fetch(
        `https://s3.f22labs.cloud/shopclips/${shop}${
          showReels ? "-reels" : ""
        }.json`,
        requestOptions
      );
      
      const res = await data.json();
      const resolvedData = {
        properties: res?.properties,
        stories: getDataBasedOnPathname(window.location.pathname, res?.data),
      };
      setData(resolvedData);
    };

    fetchData();
  }, []);

  return data;
};

export default useStoriesData;