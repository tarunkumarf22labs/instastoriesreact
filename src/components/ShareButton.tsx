import { useEffect, useState } from "react";

const ShareButton = ({ story_id }) => {
  const [clicked, setClicked] = useState(() => false);
  const currentURL = window.location.origin; 
  const shareableLink = new URL(`${currentURL}/?storyId=${story_id}`);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink.href); 
      setClicked((prev) => !prev);
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
  };

  useEffect(() => {
    setClicked(false);
  }, [story_id]);

  return (
    <button style={{ width: "50px" }} onClick={copyToClipboard}>
      {!clicked ? "Share" : "Copied"}
    </button>
  );
};

export default ShareButton;
