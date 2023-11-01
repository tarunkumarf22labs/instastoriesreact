//@ts-nocheck
import { useEffect, useState } from "react";
import CustomSlider from "./CustomSlider";
import { Variant, shopify } from "../types";
import { memo } from "react";
import PoweredBy from "./PoweredBy";
import Loader from "./Loader";
import { getClickdata } from "../hooks/firebase";

function StoryDrawer({
  setIsOpen,
  isSizeOpen,
  setIsSizeOpen,
  productname,
  startProgress,
  videoRef,
}: {
  isOpen: boolean;
  productname: string;
}) {
  function handledata({product}) {
    console.log({
      title: product.title,
      variants: product.variants,
      images: product.images
    })
    return {
      title: product.title,
      variants: product.variants,
      images: product.images
    };
  };
  const [product, setProduct] = useState<any>();
  const [variant, setVariant] = useState("");
  const [textforCart, setTextforCart] = useState("Add to cart");

  useEffect(() => {
    const Abortcontoller = new AbortController();
    async function fetchData() {
      try {
        const data = await fetch(
          `${import.meta.env.VITE_URL}/products/${productname}.json`,
          { redirect: "follow", signal: Abortcontoller.signal }
        );
        const value = await data.json();
        const relevantData = handledata(value);
        setProduct(relevantData);
        setVariant(relevantData?.variants[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    setTextforCart("Add to cart");
    return () => {
      Abortcontoller.abort();
    };
  }, [productname]);

  const handleAddToCart = () => {
    setTextforCart(<Loader/>)
    
    const url = `${import.meta.env.VITE_URL}/cart/add`;

    const requestBody = {
      Style: "Limited-2",
      quantity: 1,
      form_type: "product",
      utf8: "✓",
      id: variant.id,
      sections:
        "cart-notification-product,cart-notification-button,cart-icon-bubble",
      sections_url: "/products/gadwal-limited",
    };

    const jsonRequestBody = JSON.stringify(requestBody);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: jsonRequestBody, // Set the request body as the JSON string
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response JSON if needed
      })
      .then((data) => {
        // Handle the response data here
        setTextforCart("added to cart");
      })
      .catch((error) => {
        // Handle any errors here
        setTextforCart("added to cart");
        console.error(error);
      });
  };
  return (
    <div
      className="plugin-inner_container"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {product ? (
        <>
          <CustomSlider
            productimages={product?.images}
            productName={productname}
            // productDesc={product?.description}
            productTitle={product?.title}
            productPrice={variant?.price}
            productVariants={product?.variants}
            setVariant={setVariant}
            isSizeOpen={isSizeOpen}
            setIsSizeOpen={setIsSizeOpen}
            setIsOpen={setIsOpen}
            startProgress={startProgress}
            videoRef={videoRef}
          />

          <div className="size_container">
            <button
              disabled={textforCart === "Add to cart" ? false : true}
              onClick={() => {
                handleAddToCart();
                getClickdata("ADD_TO_CART");
              }}
              className="atc_button"
              style={{ cursor: "pointer" }}
            >
              {textforCart}
            </button>
            <a
              href={`${import.meta.env.VITE_URL}/cart/${variant.id}:1?checkout`}
              className="atc_button"
              onClick={() => {
                getClickdata("BUYNOW");
              }}
            >
              BUY NOW
            </a>
          </div>
        </>
      ) : (
        ""
      )}
      <PoweredBy />
    </div>
  );
}

export const MemoizedStoryDrawer = memo(StoryDrawer);
