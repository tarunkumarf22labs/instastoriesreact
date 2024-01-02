import React, { useContext, useState, useRef, useEffect } from "react";
import GlobalContext from "./../context/Global";
import StoriesContext from "./../context/Stories";
import ProgressContext from "./../context/Progress";
import Story from "./Story";
import ProgressArray from "./ProgressArray";
import {
  GlobalCtx,
  StoriesContext as StoriesContextInterface,
} from "./../interfaces";
import useIsMounted from "./../util/use-is-mounted";
import { usePreLoader } from "../util/usePreLoader";
import { getClickdata } from "../hooks/firebase";
import ScrollIndicator from "./ScrollIndicator";

export default function Container() {
  const [currentId, setCurrentId] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(true);
  const [bufferAction, setBufferAction] = useState<boolean>(true);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  const isMounted = useIsMounted();

  let mousedownId = useRef<any>();

  const {
    width,
    height,
    loop,
    currentIndex,
    isPaused,
    keyboardNavigation,
    preventDefault,
    storyContainerStyles = {},
    onAllStoriesEnd,
    onPrevious,
    onNext,
    preloadCount,
    allStories,
    handleTouchStart,
    handleTouchEnd,
    isFirstUser,
    setFirstUser,
  } = useContext<GlobalCtx>(GlobalContext);

  let { stories } = useContext<StoriesContextInterface>(StoriesContext);

  usePreLoader(stories, currentId, preloadCount);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      previous(currentId);
    } else if (e.key === "ArrowRight") {
      next({ isSkippedByUser: true });
    }
  };

  const toggleState = (action: string, bufferAction?: boolean) => {
    setPause(action === "pause");
    setBufferAction(!!bufferAction);
  };
  const setCurrentIdWrapper = (callback) => {
    setCurrentId(callback);

    toggleState("pause", true);
  };

  const previous = (currentStoryIndex) => {
    getClickdata("VIEWS");
    if (onPrevious != undefined) {
      onPrevious(currentStoryIndex);
    }
    // setCurrentId((prev) => (prev > 0 ? prev - 1 : prev));
    setCurrentIdWrapper((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  };

  const next = (
    options: { isSkippedByUser?: boolean } = { isSkippedByUser: false }
  ) => {
    setFirstUser(false);
    if (onNext != undefined && options?.isSkippedByUser) {
      onNext(currentId);
    }
    // Check if component is mounted - for issue #130 (https://github.com/mohitk05/react-insta-stories/issues/130)
    if (isMounted()) {
      if (loop && !options?.isSkippedByUser) {
        // setCurrentId((prev) => (prev + 1) % stories.length);
        updateNextStoryIdForLoop();
      } else {
        updateNextStoryId();
      }
    }
  };

  const updateNextStoryIdForLoop = () => {
    getClickdata("VIEWS");
    setCurrentIdWrapper((prev) => {
      if (prev >= stories.length - 1) {
        onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
      }
      return (prev + 1) % stories.length;
    });
  };

  const updateNextStoryId = () => {
    getClickdata("VIEWS");
    setCurrentIdWrapper((prev) => {
      if (prev < allStories.length - 1) {
        stories = allStories[prev + 1];
        return prev + 1;
      }
      onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
      return prev;
    });
  };

  const debouncePause = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    mousedownId.current = setTimeout(() => {
      toggleState("pause");
    }, 200);
  };

  const mouseUp =
    (type: string) => (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      mousedownId.current && clearTimeout(mousedownId.current);
      if (pause) {
        toggleState("play");
      } else {
        type === "next" ? next({ isSkippedByUser: true }) : previous(currentId);
      }
    };

  const getVideoDuration = (duration: number) => {
    setVideoDuration(duration * 1000);
  };

  useEffect(() => {
    if (typeof currentIndex === "number") {
      if (currentIndex >= 0 && currentIndex < stories.length) {
        setCurrentIdWrapper(() => currentIndex);
      } else {
        console.error(
          "Index out of bounds. Current index was set to value more than the length of stories array.",
          currentIndex
        );
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    if (typeof isPaused === "boolean") {
      setPause(isPaused);
    }
  }, [isPaused]);

  useEffect(() => {
    const isClient = typeof window !== "undefined" && window.document;
    if (
      isClient &&
      typeof keyboardNavigation === "boolean" &&
      keyboardNavigation
    ) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [keyboardNavigation]);

  return (
    <div
      style={{
        ...styles.container,
        ...storyContainerStyles,
        ...{ width, height, maxWidth: "440px" },
      }}
    >
      <ProgressContext.Provider
        value={{
          bufferAction: bufferAction,
          videoDuration: videoDuration,
          currentId,
          pause,
          next,
        }}
      >
        <ProgressArray />
      </ProgressContext.Provider>
      <Story
        action={toggleState}
        bufferAction={bufferAction}
        playState={pause}
        story={stories[0]}
        getVideoDuration={getVideoDuration}
      />
      {!preventDefault && (
        <div
          onPointerDown={handleTouchStart}
          onPointerUp={handleTouchEnd}
          id="swipe"
          style={styles.overlay}
        >
          <div
            style={{
              width: "100%",
              display: "block",
            }}
            onPointerDown={
              pause
                ? () => {
                    toggleState("play");
                  }
                : debouncePause
            }
          />
          {isFirstUser && <ScrollIndicator />}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    background: "#111",
    position: "relative" as const,
    WebkitUserSelect: "none" as const,
  },
  overlay: {
    position: "absolute" as const,
    height: "inherit",
    width: "inherit",
    display: "flex",
    touchAction: "none",
  },
};
