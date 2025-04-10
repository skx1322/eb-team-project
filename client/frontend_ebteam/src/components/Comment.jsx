import React from "react";
import { FaStar } from "react-icons/fa";

const Comment = ({prop}) => {

  return (
    <>
      {prop.map((Data, index) => (
        <div
          className="border-2 border-main rounded-xl flex p-2 gap-4 hover:bg-gray-200"
          key={index}
        >
          <div className="flex flex-col">
            <p>{Data.content}</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Data.rating ? "text-secondary" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              <p>{Data.name}</p>
              <p className="text-secondary hover:underline">{Data.email}</p>
              <p>{Data.post_time}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comment;
