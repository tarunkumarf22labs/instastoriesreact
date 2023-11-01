// @ts-nocheck

import React, { isValidElement, useCallback, useEffect, useState } from "react";
import Stories from "../components/ReactInstaStories";
import { StoriesData } from "../interfaces";
import { getClickdata } from "../hooks/firebase";
import styles from './myStories.module.css'

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
          {props?.storesData.map((item, index) => (
            <img
              src={item?.image}
              key={index}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
                flexShrink: 0,
                margin: "1rem 0",
                border: "2px solid black",
                padding: "2px",
              }}
              loading="eager"
              onClick={() => {
                getClickdata("VIEWS");
                onSpecificStoriesClick(index, item);
              }}
            />
          ))}
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
          />
        </div>
      )}
    </>
  );
};

export default MyStories;
