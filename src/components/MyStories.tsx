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
import { getClickdata, loadFirebase } from "../hooks/firebase";
import { useWindowWidth } from "../hooks/useWindowSize";
import {
  capitalizeFirstLetterOfEachWord,
  getInitialData,
} from "../util/common";
import {
  SET_ACTIVE_STORIES_AND_INDEX,
  SET_CURRENT_INDEX,
  SET_ZINDEX,
  SHOW_AND_SET_INDEX_FOR_ACTIVE_STORY,
  TOGGLE_MUTE,
  SET_ACTIVE_STORIES_INDEX_ADN_SHOW,
  TOGGLE_SHOW_STORIES,
} from "../reducer/stories.actionTypes";
import storiesReducer from "../reducer/stories.reducer";

import styles from "../styles/myStories.module.css";
import { useTouchActions } from "../hooks/touchActions";

const MyStories = (props) => {
  const [state, dispatch] = useReducer(storiesReducer, getInitialData(props));
  const {
    storiesData,
    showStories,
    activeStoriesIndex,
    activeStories,
    isMuted,
    currentIndex,
    zIndex,
  } = state;

  const videoRef = useRef(null);
  const { isSizeGreaterThan440, height } = useWindowWidth();
  const { handleTouchStart, handleTouchEnd } = useTouchActions({
    storiesData,
    activeStoriesIndex,
    dispatch,
  });

  const deviceHeight = () => {
    if (!isSizeGreaterThan440) {
      return height;
    }
    return "100%";
  };

  const onSpecificStoriesClick = useCallback((index, payload) => {
    getClickdata("VIEWS");
    dispatch({ type: SET_ACTIVE_STORIES_INDEX_ADN_SHOW, payload: index });
  }, []);

  const onPreviousBtnClick = useCallback(
    (currentStoryIndex) => {
      if (currentStoryIndex === 0 && activeStoriesIndex !== 0) {
        dispatch({
          type: SET_ACTIVE_STORIES_AND_INDEX,
          payload: activeStoriesIndex - 1,
        });
      }
    },
    [activeStoriesIndex]
  );

  const hanldeUpdateZindex = useCallback(
    (action) => {
      if (action === "open") {
        dispatch({ type: SET_ZINDEX, payload: "2147483647" });
      } else {
        dispatch({ type: SET_ZINDEX, payload: "2147483646" });
      }
    },
    [zIndex]
  );

  const onAllStoriesEnd = useCallback(() => {
    if (activeStoriesIndex === storiesData.length - 1) {
      dispatch({ type: SET_ACTIVE_STORIES_AND_INDEX, payload: 0 });
      return;
    }
    if (activeStoriesIndex < storiesData.length) {
      dispatch({
        type: SET_ACTIVE_STORIES_AND_INDEX,
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
        dispatch({ type: SET_ACTIVE_STORIES_AND_INDEX, payload: 0 });
        return;
      }
    },
    [activeStories, storiesData]
  );

  const onAudioClick = useCallback(() => {
    dispatch({ type: TOGGLE_MUTE });
  }, [isMuted]);

  const onCloseClick = useCallback(() => {
    dispatch({ type: TOGGLE_SHOW_STORIES, payload: false });
    hanldeUpdateZindex("close");
    if (currentIndex != 0) dispatch({ type: SET_CURRENT_INDEX, payload: 0 });
  }, [showStories]);

  const getHeader = useCallback(
    (index) => {
      const { name, image } = props?.storesData[index];
      return { profileImage: image, heading: name };
    },
    [activeStoriesIndex]
  );

  const handleScroll = (event) => {
    const { deltaY } = event;

    if (deltaY > 0) {
      // Scrolling down, play the next video
      // debounce(() => next({ isSkippedByUser: true }), 2000);
      next({ isSkippedByUser: true });
    } else if (deltaY < 0) {
      // Scrolling up, play the previous video
      // debounce(() => previous(currentId), 10);
      onPreviousBtnClick(currentId);
    }
  };

  const getAlignmentOfStories = useMemo(() => {
    const numOfStories = props?.storesData?.length;
    if (props?.showReels) {
      if (!isSizeGreaterThan440) {
        return "flex-start";
      } else if (isSizeGreaterThan440 && numOfStories > 5) {
        return "flex-start";
      } else {
        return "center";
      }
    }
    if (!isSizeGreaterThan440 && numOfStories > 4) {
      return "flex-start";
    } else if (isSizeGreaterThan440 && numOfStories > 10) {
      return "flex-start";
    } else {
      return "center";
    }
  }, [isSizeGreaterThan440, props?.showReels]);

  const storiesProps = useMemo(
    () => ({
      handleTouchStart,
      handleTouchEnd,
      stories: activeStories,
      activeStoriesIndex,
      defaultInterval: 5000,
      onPrevious: onPreviousBtnClick,
      onAllStoriesEnd,
      onNext: onNextBtnClick,
      allStories: storiesData,
      loop: true,
      currentIndex,
      header: getHeader(activeStoriesIndex),
      onAudioClick,
      onCloseClick,
      videoRef,
      width: isSizeGreaterThan440 ? "440px" : "100%",
      isMuted,
    }),
    [
      handleTouchStart,
      handleTouchEnd,
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
      currentIndex,
      storiesData,
    ]
  );

  const findIndexesForStory = useCallback(
    (storiesData) => {
      const story_id = window?.location?.search.split("=")[1];
      if (story_id) {
        for (let i = 0; i < storiesData.length; i++) {
          for (let j = 0; j < storiesData[i].length; j++) {
            if (storiesData[i][j]?.id == story_id) {
              return { activeStoriesIndex: i, activeChildStoryIndex: j };
            }
          }
        }
      }
      return {};
    },
    [storiesData]
  );

  useEffect(() => {
    const { activeStoriesIndex, activeChildStoryIndex } =
      findIndexesForStory(storiesData);

    if (
      activeStoriesIndex !== undefined &&
      activeChildStoryIndex !== undefined
    ) {
      dispatch({
        type: SHOW_AND_SET_INDEX_FOR_ACTIVE_STORY,
        payload: {
          activeStoriesIndex,
          currentIndex: activeChildStoryIndex,
          showStories: true,
        },
      });
    }
  }, [storiesData]);

  if (videoRef?.current) {
    videoRef.current.muted = isMuted;
  }
  useEffect(() => {
    loadFirebase();
  }, [storiesData]);

  return (
    <>
      <h2
        style={{
          marginTop: 0,
          textTransform: "uppercase",
          fontWeight: 600,
          width: "100%",
          color: "#000",
          textAlign: "center",
          fontSize: "16px",
          margin: "3rem 0 2rem",
        }}
      >
        🎥 Tap any reel to Shop Now 🌟
      </h2>
      <div
        className={styles.myStoriesContainer}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: getAlignmentOfStories,
          overflowX: "scroll",
          width: "100%",
          padding: "0 10px",
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
          className={styles.specialContainer}
          style={{
            zIndex: zIndex,
            height: deviceHeight(),
          }}
        >
          <Stories {...storiesProps} />
        </div>
      )}
    </>
  );
};

export default MyStories;
