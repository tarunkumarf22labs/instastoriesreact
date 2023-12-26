import { useRef } from "react";
import { SET_ACTIVE_STORIES_AND_INDEX } from "../reducer/stories.actionTypes";
import { getClickdata } from "./firebase";

export const useTouchActions = ({
  storiesData,
  activeStoriesIndex,
  dispatch,
}) => {
  const startY = useRef(null);
  const handleTouchStart = (event) => {
    startY.current = event.clientY;
  };

  const handleTouchEnd = (event) => {
    if (!startY.current) return;

    const touchY = event.clientY;
    const deltaY = touchY - startY.current;
    const minDistance = 50; // Adjust as needed

    // Swipe Up
    if (deltaY < -minDistance) {
      if (activeStoriesIndex === storiesData.length - 1) {
        dispatch({
          type: SET_ACTIVE_STORIES_AND_INDEX,
          payload: 0,
        });
        return;
      }
      if (activeStoriesIndex < storiesData.length - 1) {
        dispatch({
          type: SET_ACTIVE_STORIES_AND_INDEX,
          payload: activeStoriesIndex + 1,
        });
      }
      getClickdata("VIEWS");
      // Implement your logic for swipe up
    }
    // Swipe Down
    else if (deltaY > minDistance) {
      if (activeStoriesIndex === 0) {
        return;
      } else if (activeStoriesIndex > 0) {
        dispatch({
          type: SET_ACTIVE_STORIES_AND_INDEX,
          payload: activeStoriesIndex - 1,
        });
      }
      getClickdata("VIEWS");
      // Implement your logic for swipe down
    }
    startY.current = null;
  };

  return {
    handleTouchStart,
    handleTouchEnd,
  };
};
