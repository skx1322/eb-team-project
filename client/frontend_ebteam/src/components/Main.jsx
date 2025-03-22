import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BackgroundVideo from "../assets/BackgroundVideo.mp4";
import AboutBG from "../assets/AboutBG.avif";
import DeveloperBG from "../assets/DeveloperBG.avif";
import EBTutBG from "../assets/EBGuideTut.jpg";
import MSTutBG from "../assets/MSGuideTut.jpg";

const Main = () => {
  const location = useLocation();

  return (
    <div className="relative flex justify-center min-h-screen overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-start w-full h-full">
        <Outlet />
      </div>
      {location.pathname === "/" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={BackgroundVideo} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage:
              location.pathname === "/about"
                ? `url(${AboutBG})`
                : location.pathname === "/developer"
                ? `url(${DeveloperBG})`
                : location.pathname === "/ebguide"
                ? "linear-gradient(to bottom, #3b82f6, #1e3a8a)"
                : location.pathname === "/msteam"
                ? "linear-gradient(to bottom, #9333ea, #4c1d95)"
                : location.pathname === "/ebguide/assignment-guide"
                ? `url(${EBTutBG})`
                : location.pathname === "/msteam/other-page"
                ? `url(${MSTutBG})`
                : "none",
            opacity:
              location.pathname.startsWith("/developer") ||
              location.pathname.startsWith("/ebguide")
                ? location.pathname === "/ebguide/assignment-guide" ||
                  location.pathname.startsWith("/msteam")
                  ? 1
                  : 0.5
                : 1,
          }}
        />
      )}
    </div>
  );
};

export default Main;
