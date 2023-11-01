// @ts-nocheck
import "./customSlider.css";
import { useEffect, useState } from "react";
import { ImageElement } from "../types";
import { getClickdata } from "../hooks/firebase";

function Customslider({
  productimages,
  productTitle,
  productName,
  productPrice,
  productVariants,
  setVariant,
  isSizeOpen,
  setIsSizeOpen,
  setIsOpen,
  videoRef,
  startProgress,
}: {
  productimages: ImageElement[];
}) {
  console.log("custom slide")
  const [slides, setSlides] = useState({
    currentImg: productimages[0]?.src,
    currentImgIndex: 0,
    imgData: productimages,
    currentSizeIndex: 0,
    currentSize: productVariants[0]?.title,
    sizeData: productVariants,
    totalSlides: productimages.length,
  });

  const onSliderSizeClick = (index) => {
    const selectedSize = slides.sizeData[index];

    setVariant(selectedSize);

    setSlides({
      ...slides,
      currentSize: selectedSize.title,
      currentSizeIndex: index,
    });
    setIsSizeOpen(!isSizeOpen);
  };

  return (
    <div className="custom-slider-container">
      <div className="nav-icons">
        <a
          href={`${import.meta.env.VITE_URL}/products/${productName}`}
          target="__blank"
          onClick={() => getClickdata("VIEW_PRODUCT")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6.75C18 6.94891 17.921 7.13968 17.7803 7.28033C17.6397 7.42098 17.4489 7.5 17.25 7.5C17.0511 7.5 16.8603 7.42098 16.7197 7.28033C16.579 7.13968 16.5 6.94891 16.5 6.75V2.56125L10.2816 8.78063C10.1408 8.92136 9.94996 9.00042 9.75094 9.00042C9.55191 9.00042 9.36104 8.92136 9.22031 8.78063C9.07958 8.63989 9.00052 8.44902 9.00052 8.25C9.00052 8.05098 9.07958 7.86011 9.22031 7.71937L15.4387 1.5H11.25C11.0511 1.5 10.8603 1.42098 10.7197 1.28033C10.579 1.13968 10.5 0.948912 10.5 0.75C10.5 0.551088 10.579 0.360322 10.7197 0.21967C10.8603 0.0790178 11.0511 0 11.25 0H17.25C17.4489 0 17.6397 0.0790178 17.7803 0.21967C17.921 0.360322 18 0.551088 18 0.75V6.75ZM14.25 9C14.0511 9 13.8603 9.07902 13.7197 9.21967C13.579 9.36032 13.5 9.55109 13.5 9.75V16.5H1.5V4.5H8.25C8.44891 4.5 8.63968 4.42098 8.78033 4.28033C8.92098 4.13968 9 3.94891 9 3.75C9 3.55109 8.92098 3.36032 8.78033 3.21967C8.63968 3.07902 8.44891 3 8.25 3H1.5C1.10218 3 0.720644 3.15804 0.43934 3.43934C0.158035 3.72064 0 4.10218 0 4.5V16.5C0 16.8978 0.158035 17.2794 0.43934 17.5607C0.720644 17.842 1.10218 18 1.5 18H13.5C13.8978 18 14.2794 17.842 14.5607 17.5607C14.842 17.2794 15 16.8978 15 16.5V9.75C15 9.55109 14.921 9.36032 14.7803 9.21967C14.6397 9.07902 14.4489 9 14.25 9Z"
              fill="black"
            />
          </svg>
        </a>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            videoRef.current.play();
            setIsOpen(false);
            startProgress();
            videoRef.current.play();
          }}
        >
          <path
            d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM10 18.25C8.36831 18.25 6.77326 17.7661 5.41655 16.8596C4.05984 15.9531 3.00242 14.6646 2.378 13.1571C1.75358 11.6496 1.5902 9.99085 1.90853 8.3905C2.22685 6.79016 3.01259 5.32015 4.16637 4.16637C5.32016 3.01259 6.79017 2.22685 8.39051 1.90852C9.99085 1.59019 11.6497 1.75357 13.1571 2.37799C14.6646 3.00242 15.9531 4.05984 16.8596 5.41655C17.7661 6.77325 18.25 8.3683 18.25 10C18.2475 12.1873 17.3775 14.2843 15.8309 15.8309C14.2843 17.3775 12.1873 18.2475 10 18.25ZM14.2806 7.96937C14.3504 8.03903 14.4057 8.12175 14.4434 8.21279C14.4812 8.30384 14.5006 8.40144 14.5006 8.5C14.5006 8.59856 14.4812 8.69616 14.4434 8.7872C14.4057 8.87825 14.3504 8.96097 14.2806 9.03063L10.5306 12.7806C10.461 12.8504 10.3783 12.9057 10.2872 12.9434C10.1962 12.9812 10.0986 13.0006 10 13.0006C9.90144 13.0006 9.80385 12.9812 9.7128 12.9434C9.62175 12.9057 9.53903 12.8504 9.46938 12.7806L5.71938 9.03063C5.57865 8.88989 5.49959 8.69902 5.49959 8.5C5.49959 8.30098 5.57865 8.11011 5.71938 7.96937C5.86011 7.82864 6.05098 7.74958 6.25 7.74958C6.44903 7.74958 6.6399 7.82864 6.78063 7.96937L10 11.1897L13.2194 7.96937C13.289 7.89964 13.3718 7.84432 13.4628 7.80658C13.5538 7.76884 13.6514 7.74941 13.75 7.74941C13.8486 7.74941 13.9462 7.76884 14.0372 7.80658C14.1283 7.84432 14.211 7.89964 14.2806 7.96937Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="prod-desc">
        <div className="prod-info">
          <a href={`${import.meta.env.VITE_URL}/products/${productName}`}
           onClick={()=> getClickdata("VIEW_PRODUCT")}
           >
            <h5 style={{ fontSize: "14px", marginBottom: ".5rem", width: '80%' }}>
              {productTitle}
            </h5>
          </a>
          <h5
            style={{
              fontSize: "14px",
            }}
          >
            Rs. {productPrice}{" "}
          </h5>
        </div>
      </div>

      <div id="main__container">
        <a href={`${import.meta.env.VITE_URL}/products/${productName}`} style={{textDecoration: "none"}} 
        onClick={()=> getClickdata("VIEW_PRODUCT")}
        >
          <div className="prod-images">
            {slides.imgData.map((prod) => (
              <div className="prod-image">
                <img src={prod.src} alt={prod.title} style={{maxWidth: "fit-content !important"}} loading="eager"/>
              </div>
            ))}
          </div>
        </a>
      </div>
      {slides.sizeData.length > 1 && (
        <div className="all__slides__container">
          <div className="all_slides">
            <div className="slider__container">
              {slides.sizeData &&
                slides.sizeData.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`slide__container ${
                      slides.currentSizeIndex === index ? "active__size" : ""
                    }`}
                    onClick={() => onSliderSizeClick(index)}
                    style={{
                      color: `${
                        slides.currentSizeIndex === index ? "#fff" : "#000"
                      }`,
                    }}
                  >
                    <h6 className="size__text">{slide?.title}</h6>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customslider;
