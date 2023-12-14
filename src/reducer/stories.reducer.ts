import {
  HIDE_STORIES,
  SET_ACTIVE_STORIES_INDEX,
  SET_STORIES_DATA,
  SHOW_STORIES,
  TOGGLE_MUTE,
  SET_ACTIVE_STORIES,
  SET_CURRENT_INDEX,
  SHOW_AND_SET_INDEX_FOR_ACTIVE_STORY
} from "./stories.actionTypes";

 const storiesReducer = (state, action) => {
  switch (action.type) {
    case SET_STORIES_DATA:
      return { ...state, storiesData: action.payload };
    case SHOW_STORIES:
      return { ...state, showStories: true };
    case HIDE_STORIES:
      return { ...state, showStories: false };
    case SET_ACTIVE_STORIES_INDEX:
      return { ...state, activeStoriesIndex: action.payload };
    case TOGGLE_MUTE:
      return { ...state, isMuted :!state.isMuted};
    case SET_ACTIVE_STORIES: 
    return{ ...state, activeStories: state.storiesData[action.payload]}
    case SET_CURRENT_INDEX:
      return {...state, currentIndex: action.payload}
    case SHOW_AND_SET_INDEX_FOR_ACTIVE_STORY:
      return {...state, activeStoriesIndex: action.payload.activeStoriesIndex, currentIndex: action.payload.currentIndex, showStories: true }
    default:
      return state;
  }
};


export default storiesReducer;
