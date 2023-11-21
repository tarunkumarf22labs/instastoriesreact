// @ts-nocheck
import React, { useState, useEffect } from "react";
import MyStories from "./components/MyStories";
import useStoriesData from "./hooks/useStoriesData";
import "./App.css";

function App(props) {
  const showReels = props.container.attributes.showReels;
  const {stories, properties} = useStoriesData(showReels)
  
  return <>{stories?.length ? <MyStories showReels={showReels} storesData={stories} properties={properties}/> : null}</>;
}

export default App;
