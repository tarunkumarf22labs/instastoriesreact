import { logoSrc } from "../constants";

type Props = {};

const PoweredBy = (props: Props) => {
  return (
    <div
      style={{
        height: "22px",
        margin: "3pxx 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1px",
        position: "absolute",
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
          padding: "0px 6px",
          fontSize: "8px",
        }}
      >
        Powered By{" "}

        <img style={{width: '15px', height: '15px'}} src={logoSrc} alt="logo" />
        {" "}
        Shopclips
      </span>
    </div>
  );
};

export default PoweredBy;
