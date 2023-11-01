// @ts-nocheck
import React, { useState, useEffect } from "react";
import MyStories from "./components/MyStories";
import "./App.css";

// api call from a hook

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "GET",
      };
      const shop = window.Shopify?.shop?.split(".")[0] || "youthrobe";
      const data = await fetch(
        `https://s3.f22labs.cloud/shopclips/${shop}.json`,
        requestOptions
      );
      const res = await data.json();
      const vdata = res;
      setData(vdata);
    };

    fetchData();
  }, []);

  return <>{data.length ? <MyStories storesData={data} /> : null}</>;
}

export default App;
