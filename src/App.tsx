// @ts-nocheck
import React, { useState, useEffect } from "react";
import MyStories from "./components/MyStories";
import "./App.css";
import useStoriesData from "./hooks/useStoriesData";

function App(props) {
  const showReels = props.container.attributes.showReels;
  const data = useStoriesData(showReels)

  return <>{data.length ? <MyStories showReels={showReels} storesData={data} /> : null}</>;
}

export default App;
