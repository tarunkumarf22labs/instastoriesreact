// @ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { getClickdata } from "../hooks/firebase";
import styles from "../styles/productCard.module.css";
import { CURRENCY_VS_SYMBOL, URL, logoSrc } from "../constants";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const Abortcontoller = new AbortController();
    async function fetchData() {
      try {
        const response = await axios.get(
          `${URL}/products/${productname}.json`,
          {
            redirect: "follow",
            cancelToken: new axios.CancelToken((cancel) =>
              Abortcontoller.signal.addEventListener("abort", cancel)
            ),
          }
        );

        const relevantData = handledata(response.data);
        setProduct(relevantData);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData();
    return () => {
      Abortcontoller.abort();
    };
  }, [productname]);

  const handleOpenProductDetails = () => {
    triggers.setProductId(productname.trim());
    setIsOpen((prev) => !prev);
    stopProgress();
    videoRef?.current.pause();
    getClickdata("SHOP_NOW");
  };

  const handleOverlayClick = () => {
    startProgress();
  };

  const getContentString = (title) => {
    if (title?.length > 20) return title?.substring(0, 20) + "...";
    return title;
  };

  return product?.title ? (
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
                width: "80px",
                height: "80px",
                borderRadius: "5px",
                objectFit: "contain",
              }}
            />
          </div>
          <div
            className={styles.productCardInfo}
            onMouseEnter={() => triggers.setProductId(productname)}
            onClick={() => handleOpenProductDetails()}
          >
            <span className={styles.productCardInfoTitle}>
              {getContentString(product?.title)}
            </span>
            <span className={styles.productCardInfoPrice}>
              {CURRENCY_VS_SYMBOL[window?.Shopify?.currency?.active] || "Rs."}{" "}
              {product?.variants[0].price}
            </span>
          </div>
        </div>
      )}
      <button
        onClick={() => handleOpenProductDetails()}
        className={styles.addToCartProductCard}
      >
        Shop Now
      </button>
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
    <></>
  );
};

export default ProductCard;
