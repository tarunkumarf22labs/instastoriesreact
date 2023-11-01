import React from "react";

const Loader = () => {
  const animationStyle = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style>{animationStyle}</style>
      <div
        style={{
          width: "20px",
          height: "20px",
          border: "5px solid #007bff",
          borderTop: "5px solid transparent",
          borderRadius: "50%",
          animation: "spin 2s linear infinite",
          display: "block",
        }}
      ></div>
    </div>
  );
};

export default Loader;
