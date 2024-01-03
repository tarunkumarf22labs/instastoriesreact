// @ts-nocheck
import React, { useMemo } from "react";
import MyStories from "./components/MyStories";
import useStoriesData from "./hooks/useStoriesData";
import ErrorBoundary from "./components/ErrorBoundary";

import "./App.css";

interface AppProps {
  container: {
    attributes: {
      showreels: string;
      circlesize: string;
      circlecolor: string;
    };
  };
}

const App: React.FC<AppProps> = (props) => {
  const { showreels, circlesize, circlecolor } = props?.container?.attributes;
  const showReels = showreels?.value;
  const circleSize = circlesize?.value;
  const circleColor = circlecolor?.value;
  const { data, loading, error } = useStoriesData(showReels);

  const derivedProps = useMemo(
    () => ({
      showReels,
      circleSize,
      circleColor,
    }),
    [showReels, circleSize, circleColor]
  );

  if (loading || error) {
    return null;
  }

  return (
    <ErrorBoundary>
      <MyStories
        stories={data}
        {...derivedProps}
      />
    </ErrorBoundary>
  );
};

export default App;
