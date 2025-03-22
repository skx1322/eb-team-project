import React from "react";
import { Link, useLocation } from "react-router-dom";
import EBLogo from "../assets/ebTeam.png";

const Header = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-100 font-inter flex items-center justify-around px-8">
      <div className="flex items-center gap-4" >
        <img src={EBLogo} alt="" className="md:h-24 md:w-24 h-12 w-12" />
        <Link className="lg:text-5xl text-xl font-audiowide md:text-3xl">
          <span className="text-ebwise-color">eB</span>
          <span className="text-msteam-color">Guide</span>
        </Link>
      </div>

      <div className="grid grid-cols-3 text-main">
        {[
          { Title: "Home", Link: "/" },
          { Title: "About", Link: "/about" },
          { Title: "Developers", Link: "/developer" },
        ].map((DataLabel, index) => (
          <Link
            className={`md:text-2xl hover:text-red-600 ${
              location.pathname === DataLabel.Link ? "text-red-500 underline" : ""
            }`}
            key={index}
            to={DataLabel.Link}
          >
            {DataLabel.Title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
