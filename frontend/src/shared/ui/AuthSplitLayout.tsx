import React from "react";

import "./AuthSplitLayout.scss";


export type AuthSplitLayoutProps = {
  splineUrl?: string;
  title?: string;
  subtitle?: string;
  linkText?: string;
  linkPath?: string;
  linkLabel?: string;
  children: React.ReactNode;
};


export default function AuthSplitLayout({ 
  splineUrl, 
  title, 
  subtitle, 
  linkText, 
  linkPath, 
  linkLabel, 
  children 
}: AuthSplitLayoutProps) {
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
        <div className="auth-content">
          <div className="auth-header">
            {title && <h1>{title}</h1>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          
          {children}
          
          {linkText && linkPath && linkLabel && (
            <div className="auth-footer">
              <p>{linkText} <a href={linkPath}>{linkLabel}</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}