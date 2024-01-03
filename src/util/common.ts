const getProductsMap = (products) => {
  if (!products.length) return [];
  return products?.map(({ product_id, product_handle }) => ({
    id: product_id,
    productname: product_handle,
  }));
};

const getChildStoriesMap = (medias) => {
  if (!medias.length) return [];
  return medias?.map(({ media_id, media_url, products }) => ({
    id: media_id,
    storiescontnet: media_url,
    dots: getProductsMap(products),
  }));
};

export const getResolvedData = (stories) => {
  if (!stories.length) return [];
  return stories?.map(({ story_id, thumbnail, story_name, files }) => {
    return {
      id: story_id,
      image: thumbnail,
      name: story_name,
      childstories: getChildStoriesMap(files),
    };
  });
};

function capitalizeFirstLetter(inputString) {
  if (inputString.length === 0) return inputString;
  return (
    inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
  );
}

export const capitalizeFirstLetterOfEachWord = (str) => {
  if (!str) return "";
  const words = str?.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = capitalizeFirstLetter(words[i]);
  }
  return words.join(" ");
};

const generateStoriesData = (storiesData) =>
  storiesData?.map(({ childstories }) =>
    childstories?.map((item) => ({
      ...item,
      url: item?.storiescontnet,
      type: item?.storiescontnet.includes("mp4") ? "video" : "image",
    }))
  );

export const getInitialData = (props) => ({
  storiesData: generateStoriesData(props?.stories),
  showStories: false,
  activeStoriesIndex: 0,
  activeStories: [],
  isMuted: false,
  currentIndex: 0,
  zIndex: "2147483646",
});

export const handledata = ({ product }) => ({
  id: product?.id,
  title: product?.title,
  variants: product?.variants,
  images: product?.images,
});

export const getHeader = (storiesData) => ({
  profileImage: storiesData?.image,
  heading: storiesData?.name,
});
