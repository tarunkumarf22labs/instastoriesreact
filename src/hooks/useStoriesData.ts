import { useEffect, useState } from "react";
import { getResolvedData } from "../util/common";
import { BASE_URL } from "../constants";

const useStoriesData = (showReels) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url = `${BASE_URL}/stories`;
      if (showReels) {
        url = `${BASE_URL}/reels`;
      }

      const store = window?.Shopify;
      const shop = store?.shop?.split(".")[0];
      const access_token = store?.accessToken;
      const path = window?.location?.pathname;

      const queryParams = {
        store_id: `offline_${shop}`,
        access_token,
        path: path || "/*",
      };
      const urlWithParams = new URL(url);
      urlWithParams.search = new URLSearchParams(queryParams).toString();
      const data = await fetch(urlWithParams, {
        method: "GET",
      });
      const stories = await data.json();
      const resolvedData = getResolvedData(stories);
      setData(resolvedData);
    };

    fetchData();
  }, []);

  return data;
};

export default useStoriesData;
