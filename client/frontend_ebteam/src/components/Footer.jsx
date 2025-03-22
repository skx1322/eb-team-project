import React, { useState } from "react";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed By:", email);
  };

  const MediaAccount = [
    {
      Logo: <CiFacebook />,
      Detail: "Facebook",
      Path: "https://www.facebook.com/",
    },
    {
      Logo: <CiTwitter />,
      Detail: "Facebook",
      Path: "https://www.twitter.com/",
    },
    {
      Logo: <CiLinkedin />,
      Detail: "Facebook",
      Path: "https://www.linkedin.com/",
    },
    {
      Logo: <CiYoutube />,
      Detail: "Facebook",
      Path: "https://www.youtube.com/",
    },
  ];
  return (
    <div className="bg-main flex justify-around items-end p-24 not-lg:flex-col not-lg:items-center">
      <div className="flex flex-col lg:items-start gap-4 justify-center items-center">
        <div className="flex gap-4 items-center">
          {MediaAccount.map((MediaData, index) => (
            <Link
              className="text-4xl text-white cursor-pointer hover:text-ebwise-color hover:scale-105 transition-transform duration-200"
              key={index}
              to={MediaData.Path}
            >
              {MediaData.Logo}
            </Link>
          ))}
        </div>
        <p className="font-inter md:text-xl text-white">© 2024 by eBTeams made with React.js</p>
      </div>
      <div className="font-inter flex flex-col gap-4 items-center not-md:mt-6">
        <p className="md:text-2xl text-white">Subscribe for eBTeams Updates!</p>
        <div>
          <form onSubmit={handleSubmit} className="grid grid-cols-[80%_30%] gap-4">
            <input
              type="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-1 border-white text-white p-3 md:text-xl md:pr-24 " 
            />
            <button type="submit" className="bg-white text-main hover:text-white hover:bg-secondary transition-transform duration-200 hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
