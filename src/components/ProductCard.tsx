// @ts-nocheck
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { getClickdata } from "../hooks/firebase";
import styles from "../styles/productCard.module.css";
import { URL, logoSrc } from "../constants";
import { handledata } from "../util/common";

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
  // const [variant, setVariant] = useState("");
  // const [isVariantSelectorOpen, setIsVariantSelectorOpen] = useState(false);
  // const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  // const [textforCart, setTextforCart] = useState("Add to cart");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const Abortcontoller = new AbortController();
    async function fetchData() {
      try {
        const data = await fetch(`${URL}/products/${productname}.json`, {
          redirect: "follow",
          signal: Abortcontoller.signal,
        });
        const value = await data.json();
        const relevantData = handledata(value);
        setProduct(relevantData);
        // setVariant(relevantData?.variants[0].id);

        setIsLoading(false);
      } catch (error) {
        console.log({ productname });
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    // setSelectedVariantIndex(0);
    // setIsVariantSelectorOpen(false);
    // setTextforCart("Add to cart");
    return () => {
      Abortcontoller.abort();
    };
  }, [productname]);

  // const handleVariantSelection = (e, id, index) => {
  //   e.stopPropagation();
  //   if (videoRef.current) videoRef.current.pause();
  //   setVariant(id);
  //   setSelectedVariantIndex(index);
  //   setIsVariantSelectorOpen(true);
  // };

  const handleOpenProductDetails = () => {
    triggers.setProductId(productname.trim());
    setIsOpen((prev) => !prev);
    stopProgress();
    videoRef?.current.pause();
  };

  // variant
  // const handleAddToCart = () => {
  //   setTextforCart(<Loader />);

  //   const url = `https://deciwood.com/cart/add`;

  //   const formData = new FormData();
  //   formData.append("Style", "Limited-2");
  //   formData.append("quantity", 1);
  //   formData.append("form_type", "product");
  //   formData.append("utf8", "✓");
  //   formData.append("id", variant);
  //   formData.append("product-id", product.id);
  //   formData.append(
  //     "sections",
  //     "cart-notification-product,cart-notification-button,cart-icon-bubble"
  //   );
  //   formData.append("sections_url", `/products/${productname}`);
  //   const requestOptions = {
  //     method: "POST",
  //     body: formData,
  //   };

  //   fetch(url, requestOptions)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json(); // Parse the response JSON if needed
  //     })
  //     .then((data) => {
  //       // Handle the response data here

  //       setTextforCart("added to cart");
  //     })
  //     .catch((error) => {
  //       // Handle any errors here
  //       setTextforCart("added to cart");
  //       console.error(error);
  //     });
  // };
  const handleOverlayClick = () => {
    // if (isVariantSelectorOpen) {
    // setIsVariantSelectorOpen(false);
    startProgress();
    // }
  };

  const getContentString = (title) => {
    if (title?.length > 30) return title?.substring(0, 30) + "...";
    return title;
  };

  return product?.title ? (
    // <div
    // onClick={() => handleOverlayClick()}
    // className={isVariantSelectorOpen ? styles.variantOverlay : ""}
    // >
    <div className={styles.productCard}>
      {isLoading ? (
        <div className={styles.shimmerContainer}>
          <box className={`${styles.shine} ${styles.box}`}></box>
          <div>
            <lines className={`${styles.shine} ${styles.lines}`}></lines>
            <lines className={`${styles.shine} ${styles.lines}`}></lines>
            <lines className={`${styles.shine} ${styles.lines}`}></lines>
          </div>
        </div>
      ) : (
        <div className={styles.productCardContent}>
          <div
            className={styles.productCardImg}
            onMouseEnter={() => triggers.setProductId(productname)}
            onClick={() => {
              handleOpenProductDetails();
            }}
          >
            <img
              src={product?.images[0].src}
              alt={product?.title}
              loading="eager"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "5px",
                objectFit: "contain",
              }}
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
              {getContentString(product?.title)}
            </span>
            <span className={styles.productCardInfoPrice}>
              Rs.{product?.variants[0].price}
            </span>
          </div>
        </div>
      )}
      {/* {product?.variants?.length > 1 && (
          <div
            className={`${styles.productCardVariants} ${
              isVariantSelectorOpen ? styles.productVariantOpen : ""
            }`}
          >
            {product?.variants?.map((variant, index) => (
              <div
                key={index}
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
        )} */}
      {/* {isVariantSelectorOpen || product?.variants?.length < 2 ? ( */}
      <button
        onClick={() => {
          handleOpenProductDetails();
          videoRef?.current.pause();
          getClickdata("ADD_TO_CART");
        }}
        className={styles.addToCartProductCard}
      >
        {/* {textforCart} */}
        Know More
      </button>
      {/* ) : ( */}
      {/* <button
            className={styles.addToCartProductCard}
            onClick={() => {
              stopProgress();
              setVariant(product?.variants[0]?.id);
              setIsVariantSelectorOpen(true);
            }}
          >
            {textforCart}
          </button> */}
      {/* )} */}
      <div
        id={styles.poweredByProductCard}
        onClick={() => window.open("https://shopclips.app/", "_blank")}
      >
        <span>
          Powered By{" "}
          <img
            style={{ width: "15px", height: "15px" }}
            src={logoSrc}
            alt="logo"
          />{" "}
          Shopclips
        </span>
      </div>
    </div>
  ) : (
    // {" "}
    // </div>
    <></>
  );
};

export default ProductCard;
