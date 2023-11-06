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
  }, [showStories]);

  const getHeader = useCallback(
    (index) => {
      const { name, image } = props?.storesData[index];
      return { profileImage: image, heading: name };
    },
    [activeStoriesIndex]
  );

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
          justifyContent: `${
            props?.storesData?.length > 10 ? "flex-start" : "center"
          }`,
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
            >
              <div
                style={{
                  height: "66px",
                  width: "66px",
                  borderRadius: "50%",
                  border: "2px solid #959595",
                }}
              >
                <img
                  src={item?.image}
                  key={index}
                  style={{
                    objectFit: "cover",
                    padding: "2px",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
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
                  width: "56px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  paddingTop: "5px",
                }}
              >
                {capitalizeFirstLetterOfEachWord(item?.name)}
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
            zIndex: 2147483647,
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
