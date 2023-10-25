// @ts-nocheck

import React, { useEffect, useState } from "react";
import Stories from "../components/ReactInstaStories";
import { StoriesData } from "../interfaces";

const MyStories = (props: StoriesData) => {
  const [storiesData, setStoriesData] = useState(props?.storiesData);
  const [showStories, setShowStories] = useState(false);
  const [activeStories, setActiveStories] = useState(storiesData[0]);
  const [activeStoriesIndex, setActiveStoriesIndex] = useState(0);

  const onSpecificStoriesClick = (index) => {
    setActiveStoriesIndex(index);
    if (!showStories) {
      setShowStories(true);
    }
  };

  const onPreviousBtnClick = (currentStoryIndex) => {
    if (currentStoryIndex === 0 && activeStoriesIndex !== 0) {
      setActiveStoriesIndex((prev) => prev - 1);
    }
  };

  const onAllStoriesEnd = () => {
    if (activeStoriesIndex === storiesData.length - 1) {
      setActiveStoriesIndex(0);
      return;
    }
    if (activeStoriesIndex < storiesData.length) {
      setActiveStoriesIndex((prev) => prev + 1);
    }
  };

  const onNextBtnClick = (currentStoryIndex) => {
    if (
      currentStoryIndex === activeStories.length - 1 &&
      activeStoriesIndex === storiesData.length - 1
    ) {
      setActiveStoriesIndex(0);
      return;
    }
  };

  useEffect(() => {
    setActiveStories(storiesData[activeStoriesIndex]);
  }, [activeStoriesIndex]);

//   useEffect(() => {
//     setStoriesData(props?.storiesData)
//   },[])

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        {storiesData.map((item, index) => (
          <div
            key={index}
            style={{ width: "100px", height: "100px", backgroundColor: "red" }}
            onClick={() => {
              onSpecificStoriesClick(index);
            }}
          >
            {index}
          </div>
        ))}
      </div>
      <div style={{ paddingTop: "20px" }}>
        {showStories && (
          <Stories
            stories={activeStories}
            defaultInterval={3000}
            onPrevious={onPreviousBtnClick}
            onAllStoriesEnd={onAllStoriesEnd}
            onNext={onNextBtnClick}
            loop={true}
          />
        )}
      </div>
    </div>
  );
};

export default MyStories;
