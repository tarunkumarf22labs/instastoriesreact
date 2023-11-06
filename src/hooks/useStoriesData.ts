import { useEffect, useState } from "react";
// import { getDataBasedOnPathname } from "../util/common";

const useStoriesData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "GET",
      };
      const shop = window.Shopify?.shop?.split(".")[0] || "hustlezy";
      const data = await fetch(
        `https://s3.f22labs.cloud/shopclips/${shop}.json`,
        requestOptions
      );
      const res = await data.json();
    //   const resolvedData= getDataBasedOnPathname(window.location.pathname, res)
      setData(res?.["/"]);
    };

    fetchData();
  }, []);

  return data;
};

export default useStoriesData;