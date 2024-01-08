// @ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";
import { getResolvedData } from "../util/common";
import { BASE_URL } from "../constants";

const useStoriesData = (showReels) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${BASE_URL}/api/stories`;
        if (showReels) {
          url = `${BASE_URL}/api/reels`;
        }

        const store = window?.Shopify;
        const shop = store?.shop;
        const path = window?.location?.origin + window?.location?.pathname;

        const queryParams = {
          store_id: `offline_${shop}`,
          path: path,
        };

        const urlWithParams = new URL(url);
        urlWithParams.search = new URLSearchParams(queryParams).toString();

        const response = await axios.get(urlWithParams.toString());

        if (!response.status === 200) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const data = response.data;
        const resolvedData = getResolvedData(data);
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
