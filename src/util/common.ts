export const getDataBasedOnPathname = (path, dataObj) => {
  if (!!dataObj && path.length) {
    let dataArr = dataObj[path];
    if (dataArr.length) return dataArr;
    else return dataObj["/*"];
  }
  return [];
};

function capitalizeFirstLetter(inputString) {
  if (inputString.length === 0) return inputString;
  return (
    inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
  );
}

export const capitalizeFirstLetterOfEachWord = (str) => {
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = capitalizeFirstLetter(words[i]);
  }
  return words.join(" ");
};

const generateStoriesData = (storiesData) =>
  storiesData.map(({ childstories }) =>
    childstories.map((item) => ({
      ...item,
      url: item?.storiescontnet,
      type: item?.storiescontnet.includes("mp4") ? "video" : "image",
    }))
);

export const getInitialData = (props) => ({
  storiesData:  generateStoriesData(props?.storesData),
  showStories: false,
  activeStoriesIndex: 0,
  activeStories: [],
  isMuted: false,
})
