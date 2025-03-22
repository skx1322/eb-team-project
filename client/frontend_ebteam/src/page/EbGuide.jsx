import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import PlaceholderImage from "../assets/AssignmentPlaceholder.png";
import { Link } from "react-router-dom";
import axios from "axios";

const EbGuide = () => {
  const [guideData, setGuideData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getGuideData")
      .then((response) => {
        if (response.data.success) {
          const output = response.data.output;
          const parsedData = Array.isArray(output) ? output : [output];
          setGuideData(parsedData);
          console.log(parsedData);
        } else {
          setTutorialType("");
          console.error("Following Error Output: ", response.data.message);
        }
      })
      .catch((error) => console.error("API ERROR: ", error));
  }, []);

  return (
    <div className="font-inter flex flex-col justify-start min-h-screen p-8 w-full">
      <div className="font-inter min-h-screen flex flex-col gap-y-6">
        <div className="flex justify-around items-center text-3xl">
          <Link
            to={"/"}
            className="font-audiowide flex justify-center items-center gap-4 text-main hover:underline"
          >
            <FaArrowLeft></FaArrowLeft>
            <p>Return Home</p>
          </Link>
          <Link
            to={"/msteam"}
            className="font-audiowide flex justify-center items-center gap-4 text-purple-400 hover:underline"
          >
            <p>MSTeam's Guide</p>
            <FaArrowRight></FaArrowRight>
          </Link>
        </div>
        <p className="text-5xl text-center font-bold">
          <span className="text-red-500 font-audiowide ">eB</span>
          <span className="text-main font-audiowide ">Wise's</span> Guide
        </p>
        <div className="grid grid-cols-2 items-center justify-center gap-y-12">
          {guideData
            .filter((Data) => Data.tutorial_type === "EBWISE")
            .map((Data, index) => (
              <Link
                className="group relative max-w-[24rem] h-60 mx-auto"
                key={index}
                to={`assignment-guide?id=${Data._id}`}
              >
                <img
                  src={Data.tutorial_image}
                  alt="Assignment Guide"
                  className="w-96 h-60 rounded-xl object-cover"
                />
                <p className="absolute bottom-0 w-full bg-ebwise-color text-3xl text-white text-center p-2 rounded-b-xl transition-all duration-300 ease-in-out group-hover:bg-main group-hover:-translate-y-16 group-hover:rounded-b-none">
                  {Data.tutorial_title}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EbGuide;
