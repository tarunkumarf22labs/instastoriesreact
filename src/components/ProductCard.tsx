// @ts-nocheck
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { getClickdata } from "../hooks/firebase";
import styles from "./productCard.module.css";

type Props = {
  productname: string;
};

const ProductCard = ({
  productname,
  stopProgress,
  isOpen,
  setIsOpen,
  videoRef,
  triggers,
  startProgress,
}: Props) => {
  const [product, setProduct] = useState<any>();
  const [variant, setVariant] = useState("");
  const [isVariantSelectorOpen, setIsVariantSelectorOpen] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [textforCart, setTextforCart] = useState("Add to cart");

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
  }
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
        setVariant(relevantData?.variants[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    setSelectedVariantIndex(0);
    setIsVariantSelectorOpen(false);
    setTextforCart("Add to cart");
    return () => {
      Abortcontoller.abort();
    };
  }, [productname]);

  const handleVariantSelection = (e, id, index) => {
    e.stopPropagation()
    if (videoRef.current) videoRef.current.pause();
    setVariant(id);
    setSelectedVariantIndex(index);
    setIsVariantSelectorOpen(true);
  };
  const handleOpenProductDetails = () => {
    console.log("clicked handle");
    triggers.setProductId(productname);
    setIsOpen((prev) => !prev);
    stopProgress();
    videoRef.current.pause();
  };
  const handleAddToCart = () => {
    // Define the URL

    const url = `${import.meta.env.VITE_URL}/cart/add`;

    setTextforCart(<Loader />);

    // Define the request body as an object
    const requestBody = {
      Style: "Limited-2",
      quantity: 1,
      form_type: "product",
      utf8: "✓",
      id: variant,
      sections:
        "cart-notification-product,cart-notification-button,cart-icon-bubble",
      sections_url: "/products/gadwal-limited",
    };

    // Convert the request body to JSON
    const jsonRequestBody = JSON.stringify(requestBody);

    // Define the POST request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: jsonRequestBody, // Set the request body as the JSON string
    };

    // Make the POST request
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response JSON if needed
      })
      .then((data) => {
        // Handle the response data here
        console.log(data);
        setTextforCart("Added To Cart");
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
        setTextforCart("Added To Cart");
      });
  };

  const handleOverlayClick = () => {
    if(isVariantSelectorOpen) {
      setIsVariantSelectorOpen(false)
      startProgress();
    }
  }
  return (
    <div
      onClick={() => handleOverlayClick()}
      className={isVariantSelectorOpen ? styles.variantOverlay : ""}
    >
      <div className={styles.productCard}>
        <div className={styles.productCardContent}>
          <div
            className={styles.productCardImage}
            onMouseEnter={() => triggers.setProductId(productname)}
            onClick={() => {
              handleOpenProductDetails();
              videoRef.current.pause();
            }}
          >
            <img
              src={product?.images[0].src}
              alt={product?.title}
              loading="eager"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            className={styles.productCardInfo}
            onMouseEnter={() => triggers.setProductId(productname)}
            onClick={() => {
              handleOpenProductDetails();
              videoRef.current.pause();
            }}
          >
            <span className={styles.productCardInfoTitle}>
              {product?.title}
            </span>
            <span className={styles.productCardInfoPrice}>
              Rs.{product?.variants[0].price}
            </span>
          </div>
          {product?.variants?.length > 1 && (
            <div
              className={`${styles.productCardVariants} ${
                isVariantSelectorOpen ? styles.productVariantOpen : ""
              }`}
            >
              {product?.variants?.map((variant, index) => (
                <div
                  className={`${styles.productCardVariant} ${
                    selectedVariantIndex == index
                      ? styles.productCardVariantActive
                      : ""
                  }`}
                  onClick={(e) => handleVariantSelection(e, variant.id, index)}
                >
                  {variant?.title}
                </div>
              ))}
            </div>
          )}
        </div>
        {isVariantSelectorOpen || product?.variants?.length < 2 ? (
          <button
            onClick={() => {
              handleAddToCart();
              getClickdata("ADD_TO_CART");
            }}
            className={styles.addToCartProductCard}
          >
            {textforCart}
          </button>
        ) : (
          <button
            className={styles.addToCartProductCard}
            onClick={() => {
              stopProgress();
              setVariant(product?.variants[0]?.id);
              setIsVariantSelectorOpen(true);
            }}
          >
            {textforCart}
          </button>
        )}
        <div id={styles.poweredByProductCard}>
          <span>
            Powered By{" "}
            <svg
              width="18"
              height="18"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7.95724" cy="7" r="7" fill="white" />
              <path
                d="M7.9293 2.5L12.7188 9.30263L11.8767 10.5L9.74509 8.97368L7.9293 10.0132L6.0872 8.97368L3.96877 10.5L3.15298 9.30263L7.9293 2.5Z"
                fill="#272727"
              />
              <path
                d="M7.92951 10.0132L6.0874 8.97368L6.10028 5.10526L7.92951 2.5L9.7453 5.07902V8.97368L7.92951 10.0132Z"
                fill="#555555"
              />
              <path
                opacity="0.2"
                d="M3.15298 9.30263L7.9293 2.5L8.84065 3.79442L6.0872 8.97368L3.96877 10.5L3.15298 9.30263Z"
                fill="white"
              />
              <path
                opacity="0.3"
                d="M7.92917 2.5L12.7186 9.30263L11.8765 10.5L9.74496 8.97368L7.0589 3.73948L7.92917 2.5Z"
                fill="#272727"
              />
            </svg>{" "}
            F22 LABS
          </span>
        </div>
      </div>
      //{" "}
    </div>
  );
};

export default ProductCard;
