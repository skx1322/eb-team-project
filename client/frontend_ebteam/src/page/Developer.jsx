import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceHolder from "../assets/FuHua31.png";

const Developer = () => {
  const [DeveloperData, setDeveloperData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/receiveContributorData")
      .then((response) => {
        if (response.data.success) {
          const output = response.data.output;
          const parsedData = Array.isArray(output) ? output : [output];
          setDeveloperData(parsedData);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => console.error("API ERROR: ", error));
  }, []);
  return (
    <div className="font-inter flex flex-col items-center justify-start min-h-screen p-4">
      <p className="text-5xl font-bold underline text-center">Contributors</p>
      <p className="text-3xl text-center break-words lg:w-256">
        This website was made by Foundation in IT students as our Mini IT
        Project during our last trimester of Foundation, Trimester 2410, March
        2024.
      </p>
      <div className="grid grid-cols-2 w-full gap-12">
        {DeveloperData.map((Data, index) => (
          <div
            className="flex flex-col object-cover transform transition-transform duration-300 hover:scale-105 justify-center items-center"
            key={index}
          >
            <img
              src={Data.cont_avatar}
              alt={Data.cont_name}
              className="2xl w-64 h-64"
            />
            <div className="text-xl bg-main text-white p-2 w-64 flex flex-col">
              <p className="break-words underline">{Data.cont_name}</p>
              <div className="flex justify-between">
                <p>{Data.cont_role}</p>
                <p>{Data.cont_description}</p>
              </div>
              <p className="break-words">{Data.cont_email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developer;
