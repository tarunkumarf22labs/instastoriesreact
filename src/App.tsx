// @ts-nocheck
import React from "react";
import MyStories from "./components/MyStories";
import useStoriesData from "./hooks/useStoriesData";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

interface AppProps {
  container: {
    attributes: {
      showReels: string;
    };
  };
}

const App: React.FC<AppProps> = (props) => {
  const showReels = props.container.attributes.showReels;
  const { data, loading, error } = useStoriesData(showReels);

  if (loading) {
    return null
  }

  if (error) {
    console.error(error)
    return null
  }

  const { stories, properties } = data;
  
  return (
    <ErrorBoundary>
      <MyStories
        showReels={showReels}
        storesData={stories}
        properties={properties}
      />
    </ErrorBoundary>
  );
};

export default App;
