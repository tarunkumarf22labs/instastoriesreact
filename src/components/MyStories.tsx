// @ts-nocheck

import React, { isValidElement, useCallback, useEffect, useState } from "react";
import Stories from "../components/ReactInstaStories";
import { StoriesData } from "../interfaces";
import { getClickdata } from "../hooks/firebase";
import styles from "./myStories.module.css";
import { useWindowWidth } from "../hooks/useWindowSize";

const generateStoriesData = (storiesData) =>
  storiesData.map(({ childstories }) =>
    childstories.map((item) => ({
      ...item,
      url: item?.storiescontnet,
      type: item?.storiescontnet.includes("mp4") ? "video" : "image",
    }))
  );

const MyStories = (props) => {
  // need to add reducer
  const [storiesData, setStories] = useState(() =>
    generateStoriesData(props?.storesData)
  );
  const [showStories, setShowStories] = useState(false);
  const [activeStories, setActiveStories] = useState(() => storiesData[0]);
  const [activeStoriesIndex, setActiveStoriesIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  let videoRef = React.useRef<HTMLVideoElement>(null);

  // try to separate business logic from component
  const onSpecificStoriesClick = useCallback(
    (index, payload) => {
      setActiveStoriesIndex(index);
      if (!showStories) {
        setShowStories(true);
      }
    },
    [showStories]
  );

  const isSizeGreaterThan440 = useWindowWidth();

  const onPreviousBtnClick = useCallback(
    (currentStoryIndex) => {
      if (currentStoryIndex === 0 && activeStoriesIndex !== 0) {
        setActiveStoriesIndex((prev) => prev - 1);
      }
    },
    [activeStoriesIndex]
  );

  const onAllStoriesEnd = useCallback(() => {
    if (activeStoriesIndex === storiesData.length - 1) {
      setActiveStoriesIndex(0);
      return;
    }
    if (activeStoriesIndex < storiesData.length) {
      setActiveStoriesIndex((prev) => prev + 1);
    }
  }, [activeStoriesIndex]);

  const onNextBtnClick = useCallback(
    (currentStoryIndex) => {
      if (
        currentStoryIndex === activeStories.length - 1 &&
        activeStoriesIndex === storiesData.length - 1
      ) {
        setActiveStoriesIndex(0);
        return;
      }
    },
    [activeStories, storiesData]
  );

  const onAudioClick = useCallback(() => {
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }
    setIsMuted(videoRef.current.muted);
  }, [videoRef?.current?.muted]);

  const onCloseClick = useCallback(() => {
    setShowStories(false);
  }, [showStories]);

  const getHeader = useCallback(
    (index) => {
      const { name, image } = props?.storesData[index];
      return { profileImage: image, heading: name };
    },
    [activeStoriesIndex]
  );

  useEffect(() => {
    setActiveStories(storiesData[activeStoriesIndex]);
  }, [activeStoriesIndex]);

  if (isMuted && videoRef.current) {
    videoRef.current.muted = true;
  }

  return (
    <>
      {
        <div
          className={styles.myStoriesContainer}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: `${
              props?.storesData?.length > 10 ? "flex-start" : "center"
            }`,
            overflowX: "scroll",
            width: "100%",
            padding: "0 1rem",
          }}
        >
          {props?.storesData.map((item, index) => {

            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{
                  height: '100px',
                  width: '100px',
                  borderRadius: '50%',
                  border: "2px solid #000000",

                }}>
                <img
                  src={item?.image}
                  key={index}
                  style={{
                    objectFit: "cover",
                    padding: "2px",
                    width:'100%',
                    height: '100%',
                    borderRadius: '50%'
                  }}
                  loading="eager"
                  onClick={() => {
                    getClickdata("VIEWS");
                    onSpecificStoriesClick(index, item);
                  }}
                />
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    textOverflow: "ellipsis",
                    width: "80px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                     textAlign : "center"
                  }}
                >
                  {item?.name}
                </span>
              </div>
            );
          })}
        </div>
      }
      {/*// renderer  props pattern 
          // create a object to  */}
      {showStories && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
            zIndex: 2147483647,
            isolation: "isolate",
            alignItems: "center",
          }}
        >
          <Stories
            stories={activeStories}
            defaultInterval={3000}
            onPrevious={onPreviousBtnClick}
            onAllStoriesEnd={onAllStoriesEnd}
            onNext={onNextBtnClick}
            loop={true}
            currentIndex={0}
            header={getHeader(activeStoriesIndex)}
            onAudioClick={onAudioClick}
            onCloseClick={onCloseClick}
            videoRef={videoRef}
            width={isSizeGreaterThan440 ? '440px': '100%'}
          />
        </div>
      )}
    </>
  );
};

export default MyStories;
