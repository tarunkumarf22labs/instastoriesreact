export const getDataBasedOnPathname = (path, dataObj) => {
  if (!!dataObj && path.length) {
    let dataArr = dataObj[path];
    if (dataArr?.length) return dataArr;
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
  if (!str) return "";
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = capitalizeFirstLetter(words[i]);
  }
  return words.join(" ");
};

const generateStoriesData = (storiesData) =>
  storiesData?.map(({ childstories }) =>
    childstories.map((item) => ({
      ...item,
      url: item?.storiescontnet,
      type: item?.storiescontnet.includes("mp4") ? "video" : "image",
    }))
  );

export const getInitialData = (props) => ({
  storiesData: generateStoriesData(props?.storesData),
  showStories: false,
  activeStoriesIndex: 0,
  activeStories: [],
  isMuted: false,
  currentIndex: 0,
  zIndex: "2147483646",
});

export const handledata = ({ productName }) => {
  if (productName === "intimately") {
    return {
      id: "fjaljfafjdlfalj",
      title: productName,
      variants: [{ price: 14.3 }],
      images: [
        {
          src: "https://m.media-amazon.com/images/I/81bnhMGHNtL._SL1500_.jpg",
        },
      ],
    };
  }
  else if (productName === "respect") {
    return {
      id: "fjaljfafjdlfdafaalj",
      title: productName,
      variants: [{ price: 24.76 }],
      images: [
        {
          src: "https://www.perfume24x7.com/cdn/shop/products/DavidBeckhamRespectEauDeToiletteForMen.jpg?v=1669382825&width=1800",
        },
      ],
    };
  }
  else if (productName === "beyond") {
    return {
      id: "fjafafaffajfafjdlfdafaalj",
      title: productName,
      variants: [{ price: 28.48 }],
      images: [
        {
          src: "https://m.media-amazon.com/images/I/61i-mlRn4aL._SL1350_.jpg",
        },
      ],
    };
  }
  else if (productName === "essence") {
    return {
      id: "fjaljfafjdlfafaffdafaalj",
      title: productName,
      variants: [{ price: 26.58 }],
      images: [
        {
          src: "https://m.media-amazon.com/images/I/812Cl4nb9qL._SL1500_.jpg",
        },
      ],
    };
  }

};
