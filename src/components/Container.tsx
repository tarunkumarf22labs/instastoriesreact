import React, { useContext, useState, useRef, useEffect } from "react";
import GlobalContext from "./../context/Global";
import StoriesContext from "./../context/Stories";
import ProgressContext from "./../context/Progress";
import Story from "./Story";
import ProgressArray from "./ProgressArray";
import {
  GlobalCtx,
  StoriesContext as StoriesContextInterface, Renderer
} from "./../interfaces";
import useIsMounted from "./../util/use-is-mounted";
import { usePreLoader } from "../util/usePreLoader";



export default function () {
  console.log("container:::");
  const [currentId, setCurrentId] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(true);
  const [bufferAction, setBufferAction] = useState<boolean>(true);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [l,setL]= useState<boolean>(true);
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
    allStories
    
  } = useContext<GlobalCtx>(GlobalContext);
  let { stories } = useContext<StoriesContextInterface>(StoriesContext);
  console.log(stories, "stories:::123", currentId, allStories);

  usePreLoader(stories, currentId, preloadCount);
  console.log("allStories::123", allStories);
  useEffect(() => {
    console.log("useEffect2435");

    const handleScroll = (event) => {
      const { deltaY } = event;
      console.log("deltaY :: " + deltaY);

      if (deltaY > 0) {
        // Scrolling down, play the next video
        // debounce(() => next({ isSkippedByUser: true }), 2000);
        next({ isSkippedByUser: true });
      } else if (deltaY < 0) {
        // Scrolling up, play the previous video
        console.log("previos::::");
        debounce(() => previous(currentId), 10);
      }
    };

    const scrollElement = document.getElementById("container-id");
    scrollElement.addEventListener("wheel", handleScroll);

    return () => {
      scrollElement.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  useEffect(() => {
    console.log("useeffect:123");
    if (typeof currentIndex === "number") {
      if (currentIndex >= 0 && currentIndex < stories.length) {
        console.log("currentIndex:::", currentIndex);
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
    console.log("kwyboard navigatuon:::");
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

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log("handleKeyDown:::", e.key);
    if (e.key === "ArrowLeft") {
      previous(currentId);
    } else if (e.key === "ArrowRight") {
      next({ isSkippedByUser: true });
    }
  };

  const toggleState = (action: string, bufferAction?: boolean) => {
    setPause(action === "pause");
    console.log("toggleState:::");
    setBufferAction(!!bufferAction);
  };

  const setCurrentIdWrapper = (callback) => {
    console.log("callback::1", callback, currentId,l);
    setCurrentId(callback);

    toggleState("pause", true);
  };

  const previous = (currentStoryIndex) => {
    console.log("previous::::", currentStoryIndex);
    if (onPrevious != undefined) {
      onPrevious(currentStoryIndex);
    }
    // setCurrentId((prev) => (prev > 0 ? prev - 1 : prev));
    setCurrentIdWrapper((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // const nextcheck = () => {
  //   // Check if the currentId is within the range of stories length
  //   console.log("currentIdcurrentIdcurrentId", currentId);
  //   if (currentId < stories.length - 1) {

  //     setCurrentId(currentId + 1); // Increment currentId to move to the next video/story
  //   } else {
  //     // Handle case when the last video/story is reached
  //     // You can implement your logic here, such as looping back to the beginning
  //     // or any other action you want to take when all stories are finished
  //     console.log("Reached the end of stories");
  //     // Optionally trigger an action when all stories are finished
  //     onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
  //   }
  // };

  const next = (
    options: { isSkippedByUser?: boolean } = { isSkippedByUser: false }
  ) => {
    console.log("next::::::::", currentId, onNext, options?.isSkippedByUser);
    if (onNext != undefined && options?.isSkippedByUser) {
      console.log("currentId::::", currentId, onNext, options?.isSkippedByUser);
      onNext(currentId);
    }
    // Check if component is mounted - for issue #130 (https://github.com/mohitk05/react-insta-stories/issues/130)
    console.log("isMounted()::::", isMounted(), loop, onNext);
    if (isMounted()) {
      if (loop && !options?.isSkippedByUser) {
        // setCurrentId((prev) => (prev + 1) % stories.length);
        updateNextStoryIdForLoop();
      } else {
        setL(false)
        updateNextStoryId();
      }
    }
  };

  const updateNextStoryIdForLoop = () => {
    console.log("updateNextStoryIdForLoop::::");
    // setCurrentIdWrapper((prev) => {
    //   console.log("prepreprepre", stories.length, (prev + 1) % 6);
    //   if (prev >= stories.length - 1) {
    //     onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
    //   }
    //   return (prev + 1) % stories.length;
    // });
    setCurrentIdWrapper((prev) => {
      if (prev >= stories.length - 1) {
        onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
      }
      console.log("(prev + 1) % stories.length::", (prev + 1) % stories.length);
      return (prev + 1) % stories.length;
    });
  };

  const updateNextStoryId = () => {
    
    console.log("updateNextStoryId::::");
    
    setCurrentIdWrapper((prev) => {
      console.log(
        "prev < stories.length - 1:",
        prev < allStories.length -1 ,
        "val:",
        prev,
        allStories
      );

      if (prev < allStories.length -1) {
        console.log("incrementing prev:", prev, allStories);
        stories = allStories[prev+1];
        return (prev + 1) ;
      }
      

      console.log("Reached the end of stories");
      onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
      return prev;
    });
  };

  const debouncePause = (e: React.MouseEvent | React.TouchEvent) => {
    console.log("debouncePause ::::");
    e.preventDefault();
    mousedownId.current = setTimeout(() => {
      toggleState("pause");
    }, 200);
  };

  const mouseUp =
    (type: string) => (e: React.MouseEvent | React.TouchEvent) => {
      console.log("mouseUp:::123");
      e.preventDefault();
      e.stopPropagation();
      console.log("mouse up");
      mousedownId.current && clearTimeout(mousedownId.current);
      if (pause) {
        toggleState("play");
      } else {
        type === "next" ? next({ isSkippedByUser: true }) : previous(currentId);
      }
    };

  const getVideoDuration = (duration: number) => {
    console.log("getVideoDuration::::");
    setVideoDuration(duration * 1000);
  };

  return (
    <div
      id={"container-id"}
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
        story={currentId >=0 ? stories[0] : stories[currentId] }
        getVideoDuration={getVideoDuration}
      />
      {!preventDefault && (
        <div style={styles.overlay}>
          <div
            id={"container-id"}
            style={{ width: "50%", display: "block" }}
            onTouchStart={debouncePause}
            onTouchEnd={mouseUp("previous")}
            onMouseDown={debouncePause}
            onMouseUp={mouseUp("previous")}
            onScroll={e => { console.log("scroll:Loading", e) }}
          />
          <div
            id={"container-id"}
            style={{ width: "50%", display: "block" }}
            onTouchStart={debouncePause}
            onTouchEnd={mouseUp("next")}
            onMouseDown={debouncePause}
            onMouseUp={mouseUp("next")}
            onScroll={e=>{console.log("scroll:Loading",e);
            }}
          />
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
  },
};
