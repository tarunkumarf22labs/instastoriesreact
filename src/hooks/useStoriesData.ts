import { useEffect, useState } from "react";
import { getDataBasedOnPathname } from "../util/common";

const useStoriesData = (showReels) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "GET",
        };

        const shop = window.Shopify?.shop?.split(".")[0] || "beckham-fragrances";
        const response = await fetch(
          `https://s3.f22labs.cloud/shopclips/${shop}${
            showReels ? "-reels" : ""
          }.json`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const res = await response.json();
        const resolvedData = {
          properties: res?.properties,
          stories: getDataBasedOnPathname("/", res?.data),
        };

        console.log({resolvedData})

        setData(resolvedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useStoriesData;
