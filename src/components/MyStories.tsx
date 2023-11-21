// @ts-nocheck

import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import Stories from "../components/ReactInstaStories";
import { StoriesData } from "../interfaces";
import { getClickdata } from "../hooks/firebase";
import styles from "../styles/myStories.module.css";
import { useWindowWidth } from "../hooks/useWindowSize";
import {
  capitalizeFirstLetterOfEachWord,
  getInitialData,
} from "../util/common";
import {
  HIDE_STORIES,
  SET_ACTIVE_STORIES,
  SET_ACTIVE_STORIES_INDEX,
  SHOW_STORIES,
  TOGGLE_MUTE,
} from "../reducer/stories.actionTypes";
import { storiesReducer } from "../reducer/stories.reducer";

const MyStories = (props) => {
  const [state, dispatch] = useReducer(storiesReducer, getInitialData(props));
  const {
    storiesData,
    showStories,
    activeStoriesIndex,
    activeStories,
    isMuted,
  } = state;
  const [zIndex, setzIndex] = useState("2147483646");
  const videoRef = useRef(null);
  const isSizeGreaterThan440 = useWindowWidth();

  const onSpecificStoriesClick = useCallback(
    (index, payload) => {
      dispatch({ type: SET_ACTIVE_STORIES_INDEX, payload: index });
      !showStories && dispatch({ type: SHOW_STORIES });
    },
    [showStories]
  );

  const onPreviousBtnClick = useCallback(
    (currentStoryIndex) => {
      if (currentStoryIndex === 0 && activeStoriesIndex !== 0) {
        dispatch({
          type: SET_ACTIVE_STORIES_INDEX,
          payload: activeStoriesIndex - 1,
        });
      }
    },
    [activeStoriesIndex]
  );

  const hanldeUpdateZindex = (action) => {
    if (action === "open") {
      setzIndex("2147483647");
    } else {
      setzIndex("2147483646");
    }
  };

  const onAllStoriesEnd = useCallback(() => {
    if (activeStoriesIndex === storiesData.length - 1) {
      dispatch({ type: SET_ACTIVE_STORIES_INDEX, payload: 0 });
      return;
    }
    if (activeStoriesIndex < storiesData.length) {
      dispatch({
        type: SET_ACTIVE_STORIES_INDEX,
        payload: activeStoriesIndex + 1,
      });
    }
  }, [activeStoriesIndex, storiesData]);

  const onNextBtnClick = useCallback(
    (currentStoryIndex) => {
      if (
        currentStoryIndex === activeStories.length - 1 &&
        activeStoriesIndex === storiesData.length - 1
      ) {
        dispatch({ type: SET_ACTIVE_STORIES_INDEX, payload: 0 });
        return;
      }
    },
    [activeStories, storiesData]
  );

  const onAudioClick = useCallback(() => {
    dispatch({ type: TOGGLE_MUTE });
  }, [isMuted]);

  const onCloseClick = useCallback(() => {
    dispatch({ type: HIDE_STORIES });
    hanldeUpdateZindex("close");
  }, [showStories]);

  const getHeader = useCallback(
    (index) => {
      const { name, image } = props?.storesData[index];
      return { profileImage: image, heading: name };
    },
    [activeStoriesIndex]
  );

  const getAlignmentOfStories = useMemo(() => {
    const numOfStories = props?.storesData?.length;
    if (!isSizeGreaterThan440 && numOfStories > 4) {
      return "flex-start";
    } else if (isSizeGreaterThan440 && numOfStories > 10) {
      return "flex-start";
    } else {
      return "center";
    }
  }, [isSizeGreaterThan440]);

  const storiesProps = useMemo(
    () => ({
      stories: activeStories,
      defaultInterval: 3000,
      onPrevious: onPreviousBtnClick,
      onAllStoriesEnd: onAllStoriesEnd,
      onNext: onNextBtnClick,
      loop: true,
      currentIndex: 0,
      header: getHeader(activeStoriesIndex),
      onAudioClick: onAudioClick,
      onCloseClick: onCloseClick,
      videoRef: videoRef,
      width: isSizeGreaterThan440 ? "440px" : "100%",
      isMuted,
    }),
    [
      activeStories,
      activeStoriesIndex,
      onPreviousBtnClick,
      onAllStoriesEnd,
      onNextBtnClick,
      onAudioClick,
      onCloseClick,
      videoRef?.current,
      isSizeGreaterThan440,
      isMuted,
    ]
  );

  useEffect(() => {
    dispatch({ type: SET_ACTIVE_STORIES, payload: activeStoriesIndex });
  }, [activeStoriesIndex]);

  if (videoRef?.current) {
    videoRef.current.muted = isMuted;
  }

  return (
    <>
      <div
        className={styles.myStoriesContainer}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: props.showReels ? "" : getAlignmentOfStories,
          overflowX: "scroll",
          width: "100%",
          padding: "0 10px",
          zIndex: zIndex,
          isolation: "isolate",
          position: "relative",
        }}
      >
        {props?.storesData.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
              onClick={() => {
                // getClickdata("VIEWS");
                onSpecificStoriesClick(index, item);
                hanldeUpdateZindex("open");
              }}
            >
              <div
                style={{
                  height: props?.showReels ? "400px" : "66px",
                  width: props?.showReels ? "256px" : "66px",
                  borderRadius: props?.showReels ? "" : "50%",
                  position: props?.showReels ? "relative" : "",
                  border: `2px solid ${props?.properties?.bg}`,
                }}
              >
                {props?.showReels ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    fill="#000000"
                    height="50px"
                    width="50px"
                    version="1.1"
                    id="Capa_1"
                    viewBox="0 0 210 210"
                    xml:space="preserve"
                    className={styles.playBtn}
                    style={{
                      position: "absolute",
                      top: "43%",
                      left: "43%",
                      transform: "translate(-50%, -50%)",
                      fill: "white",
                      opacity: "80%",
                    }}
                  >
                    <path d="M179.07,105L30.93,210V0L179.07,105z" />
                  </svg>
                ) : null}
                <img
                  src={item?.image}
                  key={index}
                  style={{
                    objectFit: "cover",
                    padding: "2px",
                    width: "100%",
                    height: "100%",
                    borderRadius: props?.showReels ? "" : "50%",
                  }}
                  loading="eager"
                />
              </div>
              <span
                style={{
                  fontSize: "10px",
                  textOverflow: "ellipsis",
                  width: "56px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  paddingTop: "5px",
                }}
              >
                {capitalizeFirstLetterOfEachWord(item?.name?.trim())}
              </span>
            </div>
          );
        })}
      </div>
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
            zIndex: zIndex,
            isolation: "isolate",
            alignItems: "center",
          }}
        >
          <Stories {...storiesProps} />
        </div>
      )}
    </>
  );
};

export default MyStories;
