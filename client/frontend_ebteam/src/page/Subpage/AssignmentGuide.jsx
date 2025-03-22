import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const AssignmentGuide = () => {
  const videoRef = useRef(null); 
  const [VideoData, setVideoData] = useState("");
  const [loading, setLoading] = useState(true);

  const [TutorialData, setTutorialData] = useState([]);

  const [commentInput, setcommentInput] = useState({
    content: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcommentInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/getSpecificGuideData/${id}`)
      .then((response) => {
        if (response.data.success) {
          const output = response.data.output;
          if (output?.tutorial_video) {
            setVideoData(output);
            setLoading(false);
          } else {
            console.error("Invalid video URL received.");
          }
        } else {
          console.error("Following Error Output: ", response.data.message);
        }
      })
      .catch((error) => console.error("API ERROR: ", error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/getSpecificTutorialStep/${id}`)
      .then((response) => {
        if (response.data.success) {
          const output = response.data.output;
          const parsedData = Array.isArray(output) ? output : [output];
          setTutorialData(parsedData);
          console.log(parsedData);
        } else {
          console.error("Following Error Output: ", response.data.message);
        }
      })
      .catch((error) => console.error("API ERROR: ", error));
  }, [id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .catch((error) => console.error("Play error:", error));
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="font-inter flex flex-col lg:w-[60%] items-center justify-start min-h-screen bg-white">
      <div className="flex justify-between bg-main w-full text-center p-6">
        <Link
          to={"/ebguide"}
          className="font-audiowide flex justify-center items-center text-2xl gap-4 text-ebwise-color hover:underline transform transition-transform duration-300 hover:scale-105 hover:-translate-x-4"
        >
          <FaArrowLeft></FaArrowLeft>
          <p>Return</p>
        </Link>
        <p className="text-3xl text-center break-words text-white">
          Tutorial: {VideoData.tutorial_title}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-4 border-b-4">
        <p className="text-3xl bg-main py-3 px-4 rounded-2xl text-white">
          Tutorial Video
        </p>
        {loading ? (
          <p className="text-3xl text-gray-500 text-center">Loading Video...</p>
        ) : (
          VideoData?.tutorial_video && (
            <video
              ref={videoRef}
              loop
              controls
              onClick={togglePlay}
              className="w-full h-auto px-12"
            >
              <source src={VideoData.tutorial_video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        )}
      </div>
      <div className="flex flex-col">
        {TutorialData.map((Data, index) => (
          <div
            className="flex flex-col gap-6 p-12 justify-center items-center min-w-full"
            key={index}
          >
            <p className="text-4xl text-main self-start">
              Step: {Data.tutorial_step}
            </p>
            <img
              src={Data.tutorial_image}
              alt={Data.tutorial_title}
              className="max-w-[64rem]"
            />
            <p className="text-3xl max-w-[48rem] text-justify border-b-4 border-main">
              {Data.tutorial_content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full p-12 px-48">
        <p className="text-3xl text-start underline">Comment Section (Work in progress)</p>
        <p>0 Comment</p>
        <section className="flex flex-col">
          <form action="flex flex-col">
            <textarea
              name="content"
              value={commentInput.content}
              onChange={handleChange}
              placeholder="Leave a comment..."
              required
              className="w-full text-xl border-2 border-main p-2 px-4 rounded-2xl break-words overflow-hidden resize-none min-h-[50px] max-h-[300px]"
              rows={1} // Default height, will expand as needed
            />{" "}
            <div className="flex justify-between items-start gap-4 mt-6">
              <div className="flex flex-col gap-4">
                <input
                  name="name"
                  value={commentInput.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full border-2 border-main p-2 px-4 rounded-xl"
                />
                <input
                  name="email"
                  value={commentInput.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Your email"
                  required
                  className="w-full border-2 border-main p-2 px-4 rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="text-xl bg-main rounded-xl text-white p-2 px-4 hover:bg-ebwise-color hover:text-black transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                Comment
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AssignmentGuide;
