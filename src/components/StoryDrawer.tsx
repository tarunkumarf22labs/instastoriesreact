//@ts-nocheck
import { useEffect, useState } from "react";
import CustomSlider from "./CustomSlider";
import { Variant, shopify } from "../types";
import { memo } from "react";
import PoweredBy from "./PoweredBy";
import Loader from "./Loader";
import { getClickdata } from "../hooks/firebase";
import { URL } from "../constants";
import styles from "../styles/storyDrawer.module.css"
import { handledata } from "../util/common";

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

  const [product, setProduct] = useState<any>();
  const [variant, setVariant] = useState("");
  const [textforCart, setTextforCart] = useState("Add to cart");

  useEffect(() => {
    const Abortcontoller = new AbortController();
    async function fetchData() {
      try {
        const data = await fetch(
          `${URL}/products/${productname}.json`,
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
    setTextforCart(<Loader/>);

    const shop = window.Shopify?.cdnHost?.replace("www.", "")?.replace("/cdn", "")
    const url = `https://${shop}/cart/add`;
  
    const formData = new FormData();
    formData.append("Style", "Limited-2");
    formData.append("quantity", 1);
    formData.append("form_type", "product");
    formData.append("utf8", "✓");
    formData.append("id", variant.id);
    formData.append("product-id", product.id);
    formData.append("sections", "cart-notification-product,cart-notification-button,cart-icon-bubble");
    formData.append("sections_url", `/products/${productname}`);
  
    const requestOptions = {
      method: "POST",
      body: formData,
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
      className={styles.pluginInnerContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {product ? (
        <>
          <CustomSlider
            productimages={product?.images}
            productName={productname}
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

          <div className={styles.sizeContainer}>
            <button
              disabled={textforCart === "Add to cart" ? false : true}
              onClick={() => {
                handleAddToCart();
                getClickdata("ADD_TO_CART");
              }}
              className={styles.atcButton}
              style={{ cursor: "pointer" }}
            >
              {textforCart}
            </button>
            <a
              href={`${URL}/cart/${variant.id}:1?checkout`}
              className={styles.atcButton}
              onClick={() => {
                getClickdata("BUY_NOW");
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
