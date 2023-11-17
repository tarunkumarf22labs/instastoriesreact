export const getResolvedData = (stories) => {
  return stories.map((story) => {
    return {
      id: story?.story_id,
      image: story?.thumbnail,
      name: story?.story_name,
      childstories: story?.files.map((media) => {
        return {
          id: media?.media_id,
          storiescontnet: media.media_url,
          dots: media.products.map((product) => {
            return {
              id: product.product_id,
              productname: product.product_handle,
            };
          }),
        };
      }),
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
  storiesData: generateStoriesData(props?.storesData),
  showStories: false,
  activeStoriesIndex: 0,
  activeStories: [],
  isMuted: false,
});
