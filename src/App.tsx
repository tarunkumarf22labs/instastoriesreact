// @ts-nocheck
import React, { useState, useEffect } from "react";
import MyStories from "./components/MyStories";
import "./App.css";
import useStoriesData from "./hooks/useStoriesData";

function App() {
  const data = useStoriesData()

  return <>{data.length ? <MyStories storesData={data} /> : null}</>;
}

export default App;
