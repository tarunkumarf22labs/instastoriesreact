// @ts-nocheck

import React, { useContext } from "react";
import { GlobalCtx, Story } from "../../interfaces";
import Header from "./../../components/Header";
import GlobalContext from "../../context/Global";

const withHeader: React.FC<
  React.PropsWithChildren<{
    story: Story;
    globalHeader: Function;
  }>
> = ({ story, globalHeader, children }) => {
  const { header, onAudioClick, onCloseClick , isMuted} =
    useContext<GlobalCtx>(GlobalContext);
  return (
    <>
      {children}
      {
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 20,
            zIndex: 19,
            width: "95%",
          }}
        >
          <Header
            story={story}
            muted={isMuted}
            heading={header?.heading}
            profileImage={header?.profileImage}
            onCloseClick={onCloseClick}
            onAudioClick={onAudioClick}
          />
        </div>
      }
    </>
  );
};

export default withHeader;
