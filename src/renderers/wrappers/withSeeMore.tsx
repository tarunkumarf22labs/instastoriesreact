// @ts-nocheck
import React, { useContext, useState } from "react";
import { Action, GlobalCtx, Story } from "../../interfaces";
import ProductCard from "../../components/ProductCard";
import GlobalContext from "../../context/Global";
import { MemoizedStoryDrawer } from "../../components/StoryDrawer";
import "./index.css";

const withSeeMore: React.FC<
  React.PropsWithChildren<{
    story: Story;
    action: Action;
  }>
> = ({ story, action, children }) => {
  const { videoRef } = useContext<GlobalCtx>(GlobalContext);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const startProgress = () => {
    action("play");
  };

  const stopProgress = () => {
    action("pause");
  };

  return (
    <>
      {children}
      {story?.dots?.length ? (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            zIndex: 2147483647,
            maxHeight: "fit-content",
            height: "fit-content",
            overflowX: "hidden",
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            padding: ".5rem 0",
            justifyContent: `${
              story?.dots?.length > 1 ? "flex-end" : "center"
            }`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "flex-end",
              gap: ".5rem",
              overflowX: "auto",
              height: "auto",
              paddingLeft: "1rem",
            }}
          >
            {story?.dots?.map((prod, index) => (
              <ProductCard
                key={index}
                productname={prod?.productname.trim()}
                stopProgress={stopProgress}
                startProgress={startProgress}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                videoRef={videoRef}
                triggers={{
                  setProductId,
                  productId,
                }}
              />
            ))}
          </div>
          <div
            className={`f22storiesdrawer ${isOpen ? "f22open" : ""}`}
            onClick={() => {
              setIsOpen((prev) => !prev);
              startProgress();
              videoRef.current.play();
              setIsSizeOpen(false);
            }}
          >
            <MemoizedStoryDrawer
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isSizeOpen={isSizeOpen}
              setIsSizeOpen={setIsSizeOpen}
              startProgress={startProgress}
              videoRef={videoRef}
              productname={productId}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default withSeeMore;
