import { useState } from "react";
import styles from "../styles/shareLinkToast.module.css";

const ShareButton = ({ story_id }) => {
  const [showToast, setShowToast] = useState(false);
  const copyToClipboard = async () => {
    try {
      const currentURL = window.location.origin;
      const shareableLink = new URL(`${currentURL}/?storyId=${story_id}`);
      await navigator.clipboard.writeText(shareableLink.href);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
  };

  return (
    <>
      {showToast && (
        <div className={showToast ? styles.toast : styles.toastHidden}>
          <span> Link Copied</span>
        </div>
      )}
      <button
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(51, 51, 51, 0.74)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={copyToClipboard}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#ffff"
          height="16px"
          width="16px"
          color="white"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 458.624 458.624"
          xmlSpace="preserve"
        >
          <g>
            <g>
              <path d="M339.588,314.529c-14.215,0-27.456,4.133-38.621,11.239l-112.682-78.67c1.809-6.315,2.798-12.976,2.798-19.871    c0-6.896-0.989-13.557-2.798-19.871l109.64-76.547c11.764,8.356,26.133,13.286,41.662,13.286c39.79,0,72.047-32.257,72.047-72.047    C411.634,32.258,379.378,0,339.588,0c-39.79,0-72.047,32.257-72.047,72.047c0,5.255,0.578,10.373,1.646,15.308l-112.424,78.491    c-10.974-6.759-23.892-10.666-37.727-10.666c-39.79,0-72.047,32.257-72.047,72.047s32.256,72.047,72.047,72.047    c13.834,0,26.753-3.907,37.727-10.666l113.292,79.097c-1.629,6.017-2.514,12.34-2.514,18.872c0,39.79,32.257,72.047,72.047,72.047    c39.79,0,72.047-32.257,72.047-72.047C411.635,346.787,379.378,314.529,339.588,314.529z" />
            </g>
          </g>
        </svg>
      </button>
    </>
  );
};

export default ShareButton;
