import React from "react";

import "./AuthSplitLayout.scss";


export type AuthSplitLayoutProps = {
  splineUrl?: string;
  children: React.ReactNode;
};


export default function AuthSplitLayout({ splineUrl, children }: AuthSplitLayoutProps) {
  return (
    <div className="authSplit">
      <div className="authSplit__left" aria-hidden={!splineUrl ? "true" : "false"}>
        <div className="authSplit__gradient" />
        <div className="authSplit__splineWrap">
          {splineUrl ? (
            <iframe
              title="spline-scene"
              src={splineUrl}
              className="authSplit__spline"
              allow="autoplay; fullscreen; xr-spatial-tracking"
            />
          ) : null}
        </div>
        <div className="authSplit__grid" />
      </div>


      <div className="authSplit__right">
        {children}
      </div>
    </div>
  );
}