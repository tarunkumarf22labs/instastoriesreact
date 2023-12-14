import {
  TOGGLE_MUTE,
  SET_CURRENT_INDEX,
  SHOW_AND_SET_INDEX_FOR_ACTIVE_STORY,
  SET_ZINDEX,
  SET_ACTIVE_STORIES_INDEX_ADN_SHOW,
  TOGGLE_SHOW_STORIES,
  SET_ACTIVE_STORIES_AND_INDEX,
} from "./stories.actionTypes";

 const storiesReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SHOW_STORIES:
      return { ...state, showStories: action.payload };
    case SET_ACTIVE_STORIES_AND_INDEX:
      return {
        ...state,
        activeStoriesIndex: action.payload,
        activeStories: state?.storiesData[action.payload],
      };
    case TOGGLE_MUTE:
      return { ...state, isMuted: !state.isMuted };
    case SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.payload };
    case SHOW_AND_SET_INDEX_FOR_ACTIVE_STORY:
      return {
        ...state,
        activeStoriesIndex: action.payload.activeStoriesIndex,
        activeStories: state?.storiesData[action?.payload?.activeStoriesIndex],
        currentIndex: action.payload.currentIndex,
        showStories: true,
      };
    case SET_ZINDEX:
      return { ...state, zIndex: action.payload };
    case SET_ACTIVE_STORIES_INDEX_ADN_SHOW:
      return {
        ...state,
        activeStoriesIndex: action.payload,
        activeStories: state?.storiesData[action?.payload],
        showStories: true,
      };
    default:
      return state;
  }
};


export default storiesReducer;
