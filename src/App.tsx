// @ts-nocheck
import React, { useState, useEffect } from "react";
import MyStories from "./components/MyStories";
import "./App.css";

// api call from a hook
const fetchedData = {
  "/": [
    {
      id: 1697797634161,
      image:
        "https://cdn.shopify.com/s/files/1/0719/1930/4999/files/www.YOUTHROBE.com_4_bda7c320-4e95-4c4d-bbc9-b9b26d9b52bd.jpg?v=1697626084",
      name: "Men's Collection",
      childstories: [
        {
          id: 1697797634161,
          storiescontnet:
            "https://cdn.shopify.com/videos/c/o/v/81dbfdb4e567425bbea4fba3d38c8c77.mp4",
          dots: [
            {
              id: 1697797634161,
              productname: "youth-robes-fur-jacket-blue",
            },
            {
              id: 1697797634161,
              productname: "youth-robe-mens-raincoat-brown",
            },
            {
              id: 1697797634161,
              productname: "copy-of-youth-robe-orange-kurta-pyjama-set-2",
            },
          ],
        },
        {
          id: 1697797634161,
          storiescontnet:
            "https://cdn.shopify.com/s/files/1/0719/1930/4999/files/Copy_of_shop_now_70b83e2f-6839-4646-8ed6-23010426b0b1.jpg?v=1697633528",
          dots: [
            {
              id: 1697797634161,
              productname: "youth-robe-sports-regular-cap",
            },
            {
              id: 1697797634161,
              productname: "youth-robes-mens-cotton-arm-sleeves-pack-of-3",
            },
          ],
        },
      ],
    },
    {
      id: 1697797634162,
      image:
        "https://cdn.shopify.com/s/files/1/0719/1930/4999/files/Black_Honeycomb_Jacket.png?v=1697633527",
      name: "Jackets",
      childstories: [
        {
          id: 1697797634162,
          storiescontnet:
            "https://cdn.shopify.com/videos/c/o/v/28a2f3b89572467d94e4a4a7956dcdcf.mp4",
          dots: [
            {
              id: 1697797634162,
              productname: "youth-robe-mens-honeycomb-blue-jacket",
            },
            {
              id: 1697797634162,
              productname: "youth-robes-honeycomb-jacket-red",
            },
          ],
        },
        {
          id: 1697797634162,
          storiescontnet:
            "https://cdn.shopify.com/videos/c/o/v/cdabc8e0d6404b4e8916164fb5dc784e.mp4",
          dots: [
            {
              id: 1697797634162,
              productname: "youth-robes-honeycomb-jacket-black",
            },
            {
              id: 1697797634162,
              productname: "youth-robe-mens-striped-turtle-neck-black",
            },
          ],
        },
        {
          id: 1697797634162,
          storiescontnet:
            "https://cdn.shopify.com/s/files/1/0719/1930/4999/files/Copy_of_F2F1ED_6.jpg?v=1697633526",
          dots: [
            {
              id: 1697797634162,
              productname: "youth-robes-honeycomb-jacket-black",
            },
            {
              id: 1697797634162,
              productname: "youth-robe-fur-jacket-red",
            },
            {
              id: 1697797634162,
              productname: "youth-robes-fur-jacket-blue",
            },
            {
              id: 1697797634162,
              productname: "youth-robes-fur-jacket-olive",
            },
          ],
        },
      ],
    },
    {
      id: 1697797634162,
      image:
        "https://cdn.shopify.com/s/files/1/0719/1930/4999/files/youthrobe_4.jpg?v=1697633527",
      name: "Kurta Pajama",
      childstories: [
        {
          id: 1697797634162,
          storiescontnet:
            "https://cdn.shopify.com/videos/c/o/v/b809bf449a7b4766af059bc739e35453.mp4",
          dots: [
            {
              id: 1697797634162,
              productname: "youth-robe-orange-kurta-pyjama-set",
            },
            {
              id: 1697797634162,
              productname: "copy-of-youth-robe-orange-kurta-pyjama-set-6",
            },
            {
              id: 1697797634162,
              productname: "copy-of-youth-robe-white-kurta-pyjama-set",
            },
          ],
        },
        {
          id: 1697797634162,
          storiescontnet:
            "https://cdn.shopify.com/s/files/1/0719/1930/4999/files/2_1.jpg?v=1697633526",
          dots: [
            {
              id: 1697797634162,
              productname: "copy-of-youth-robe-orange-kurta-pyjama-set-6",
            },
          ],
        },
        {
          id: 1697797634162,
          storiescontnet:
            "https://cdn.shopify.com/s/files/1/0719/1930/4999/files/be_brave_3000_x_1500_px_1_f85aad03-85d0-42be-ba32-e4beff788474.jpg?v=1697633528",
          dots: [
            {
              id: 1697797634162,
              productname: "youth-robes-kids-white-kurta-pajama",
            },
          ],
        },
      ],
    },
    {
      id: 1697797634163,
      image:
        "https://cdn.shopify.com/s/files/1/0719/1930/4999/files/Kitchen_Apron.png?v=1697633527",
      name: "Apron",
      childstories: [
        {
          id: 1697797634163,
          storiescontnet:
            "https://cdn.shopify.com/videos/c/o/v/9646f986205849d1866f49d289c94816.mp4",
          dots: [
            {
              id: 1697797634163,
              productname: "copy-of-youth-robe-kitchen-apron-16",
            },
          ],
        },
      ],
    },
    {
      id: 1697797634163,
      image:
        "https://cdn.shopify.com/s/files/1/0719/1930/4999/files/YOUTH_ROBE_raincoats_80_sale_1.jpg?v=1697633528",
      name: "Raincoats",
      stop: "true",
      childstories: [
        {
          id: 1697797634163,
          storiescontnet:
            "https://cdn.shopify.com/videos/c/o/v/c728894d227b4271bf194f7fe8b98765.mp4",
          dots: [
            {
              id: 1697797634163,
              productname: "youth-robe-womens-blue-raincoat",
            },
            {
              id: 1697797634163,
              productname: "youth-robe-mens-raincoat-brown",
            },
            {
              id: 1697797634163,
              productname: "youth-robe-blue-raincoat",
            },
          ],
        },
        {
          id: 1697797634163,
          storiescontnet:
            "https://cdn.shopify.com/s/files/1/0719/1930/4999/files/YOUTH_ROBE_raincoats_80_sale_cfece301-f931-40f5-aa70-acdb05c3e3fb.jpg?v=1697633528",
          dots: [
            {
              id: 1697797634163,
              productname: "youth-robe-mens-black-raincoat",
            },
            {
              id: 1697797634163,
              productname: "youth-robe-blue-raincoat",
            },
          ],
        },
        {
          id: 1697797634163,
          storiescontnet:
            "https://cdn.shopify.com/videos/c/o/v/04a3fef5ca654ead96229bb6bd2c457f.mp4",
          dots: [
            {
              id: 1697797634163,
              productname: "youth-robe-womens-long-raincoat",
            },
          ],
        },
      ],
    },
  ],
};

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

      const vdata = res?.["/"];
      setData(fetchedData?.['/']);
    };

    fetchData();
  }, []);

  return <>{data.length ? <MyStories storesData={data} /> : null}</>;
}

export default App;
