//@ts-nocheck
import { useEffect, useState, useContext } from "react";
import CustomSlider from "./CustomSlider";
import { Variant, shopify } from "../types";
import { memo } from "react";
import PoweredBy from "./PoweredBy";
import Loader from "./Loader";
import { getClickdata } from "../hooks/firebase";
import { URL } from "../constants";
import styles from "../styles/storyDrawer.module.css";
import { handledata } from "../util/common";
import GlobalContext from "../context/Global";

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
  const [textforCart, setTextforCart] = useState("ADD TO CART");
  const { onCloseClick } = useContext<GlobalCtx>(GlobalContext);

 

  useEffect(() => {
    const Abortcontoller = new AbortController();
    if (!productname) return;
    async function fetchData() {
      try {
        const data = await fetch(`${URL}/products/${productname}.json`, {
          redirect: "follow",
          signal: Abortcontoller.signal,
        });
        const value = await data.json();
        const relevantData = handledata(value);
        setProduct(relevantData);
        setVariant(relevantData?.variants[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    setTextforCart("ADD TO CART");
    return () => {
      Abortcontoller.abort();
    };
  }, [productname]);

  const handleAddToCart = async () => {
    setTextforCart(<Loader />);

    const shop = window.Shopify?.cdnHost
      ?.replace("www.", "")
      ?.replace("/cdn", "");
    const url = `https://${shop}/cart/add`;

    const formData = new FormData();
    // formData.append("Style", "Limited-2");
    formData.append("quantity", 1);
    formData.append("form_type", "product");
    formData.append("utf8", "✓");
    formData.append("id", variant.id);
    formData.append("product-id", product.id);
    formData.append(
      "sections",
      "cart-notification-product,cart-notification-button,cart-icon-bubble"
    );
    formData.append("sections_url", `/products/${productname}`);

    const requestOptions = {
      method: "POST",
      body: formData,
      mode: "no-cors",
      credentials: "include",
    };

    fetch(window.Shopify.routes.root + "cart/add.js", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${JSON.stringify(response)}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("data:123 " + data);
        fetch("/cart.json")
          .then(async (response) => {
            const cart = await response.json();
            console.log("Cart data:", cart, cart.item_count);

            // Retrieve the cart count element
            const cartCountElement = document.getElementById("cartCount");

            // If count is greater than zero, display the count
            if (cart.item_count > 0) {
              cartCountElement.style.display = "flex"; // Show the count element
              cartCountElement.textContent = cart.item_count.toString(); // Set the count value
            }
            setTextforCart("ADD TO CART");
          })
          .catch((error) => {
            console.error("Error:", error);
            k;
          });

        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
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
              disabled={textforCart === "ADD TO CART" ? false : true}
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
              style={{ padding: "15px" }}
              onClick={() => {
                getClixckdata("BUY_NOW");
              }}
            >
              BUY NOW
            </a>
            <a href={`${URL}/cart`} className={styles.cartContainer}>
              <svg
                width="50"
                height="50"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="4" fill="black" />
                <g clip-path="url(#clip0_12_136)">
                  <path
                    d="M23.142 10.718C22.9545 10.493 22.7197 10.312 22.4544 10.1879C22.189 10.0638 21.8996 9.99964 21.6067 10H10.828L10.8 9.766C10.7427 9.27961 10.5089 8.83115 10.143 8.50565C9.77706 8.18015 9.30442 8.00023 8.81467 8H8.66667C8.48986 8 8.32029 8.07024 8.19526 8.19526C8.07024 8.32029 8 8.48986 8 8.66667C8 8.84348 8.07024 9.01305 8.19526 9.13807C8.32029 9.2631 8.48986 9.33333 8.66667 9.33333H8.81467C8.97796 9.33335 9.13556 9.3933 9.25758 9.50181C9.3796 9.61032 9.45756 9.75983 9.47667 9.922L10.394 17.722C10.4892 18.5332 10.879 19.2812 11.4893 19.824C12.0996 20.3668 12.8879 20.6667 13.7047 20.6667H20.6667C20.8435 20.6667 21.013 20.5964 21.1381 20.4714C21.2631 20.3464 21.3333 20.1768 21.3333 20C21.3333 19.8232 21.2631 19.6536 21.1381 19.5286C21.013 19.4036 20.8435 19.3333 20.6667 19.3333H13.7047C13.292 19.3322 12.8899 19.2034 12.5533 18.9647C12.2167 18.726 11.9622 18.389 11.8247 18H19.7713C20.5529 18 21.3096 17.7255 21.9092 17.2243C22.5089 16.7231 22.9134 16.0271 23.052 15.258L23.5753 12.3553C23.6276 12.0673 23.6158 11.7714 23.5409 11.4884C23.4661 11.2055 23.3299 10.9425 23.142 10.718ZM22.2667 12.1187L21.7427 15.0213C21.6594 15.4833 21.4163 15.9013 21.0559 16.2021C20.6955 16.5029 20.2408 16.6674 19.7713 16.6667H11.6127L10.9853 11.3333H21.6067C21.7046 11.3327 21.8015 11.3537 21.8904 11.3948C21.9793 11.4359 22.058 11.4961 22.121 11.5711C22.184 11.646 22.2297 11.734 22.2549 11.8286C22.2801 11.9233 22.2841 12.0223 22.2667 12.1187Z"
                    fill="white"
                  />
                  <path
                    d="M12.6667 24C13.4031 24 14 23.4031 14 22.6667C14 21.9303 13.4031 21.3334 12.6667 21.3334C11.9303 21.3334 11.3334 21.9303 11.3334 22.6667C11.3334 23.4031 11.9303 24 12.6667 24Z"
                    fill="white"
                  />
                  <path
                    d="M19.3333 24C20.0697 24 20.6667 23.4031 20.6667 22.6667C20.6667 21.9303 20.0697 21.3334 19.3333 21.3334C18.597 21.3334 18 21.9303 18 22.6667C18 23.4031 18.597 24 19.3333 24Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12_136">
                    <rect
                      width="50"
                      height="50"
                      fill="white"
                      transform="translate(8 8)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span
                id="cartCount"
                class={styles.cartCount}
                style={{ display: "none" }}
              >
                0
              </span>
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
