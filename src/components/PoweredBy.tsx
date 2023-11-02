import { logoSrc } from "../constants";

type Props = {};

const PoweredBy = (props: Props) => {
  return (
    <div
      style={{
        height: "22px",
        margin: "0.3rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "0.1rem",
        position: "absolute",
        // bottom: "6px",
        zIndex: 999,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      onClick={() => window.open("https://shopclips.app/", '_blank')}
    >
      <span
        style={{
          background: "#333333",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          padding: "0.2rem 0.6rem",
          fontSize: ".5rem",
        }}
      >
        Powered By{" "}
        {/* <svg
          width="18"
          height="18"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "16px",
            height: "16px",
          }}
        >
          <circle cx="7.95724" cy="7" r="7" fill="white" />
          <path
            d="M7.9293 2.5L12.7188 9.30263L11.8767 10.5L9.74509 8.97368L7.9293 10.0132L6.0872 8.97368L3.96877 10.5L3.15298 9.30263L7.9293 2.5Z"
            fill="#272727"
          />
          <path
            d="M7.92951 10.0132L6.0874 8.97368L6.10028 5.10526L7.92951 2.5L9.74530 5.07902V8.97368L7.92951 10.0132Z"
            fill="#555555"
          />
          <path
            opacity="0.2"
            d="M3.15298 9.30263L7.9293 2.5L8.84065 3.79442L6.0872 8.97368L3.96877 10.5L3.15298 9.30263Z"
            fill="white"
          />
          <path
            opacity="0.3"
            d="M7.92917 2.5L12.7186 9.30263L11.8765 10.5L9.74496 8.97368L7.0589 3.73948L7.92917 2.5Z"
            fill="#272727"
          />
        </svg> */}
        <img style={{width: '15px', height: '15px'}} src={logoSrc} alt="logo" />
        {" "}
        Shopclips
      </span>
    </div>
  );
};

export default PoweredBy;
