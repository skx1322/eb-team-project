import React from "react";

const About = () => {
  return (
    <div className="relative grid lg:grid-cols-[60%] justify-center items-center h-full my-20 not-lg:px-6">
      <div className="relative grid grid-rows-[5%_40%_50%] justify-center items-start gap-12 font-inter bg-main p-20 rounded-2xl">
        <p className="text-5xl not-md:text-3xl text-center underline text-white">
          About eBTeams
        </p>
        <p className="text-3xl not-md:text-xl text-justify text-white">
          Thank you for choosing eBTeams as your partner in navigating through
          eBwise and Microsoft Teams. Our team is dedicated to providing you
          with the highest of support and assistance to ensure a seamless
          experience. Please do not hesitate to reach out to us with questions
          or concerns you may have. We are here to help.
        </p>
        <p className="text-3xl not-md:text-xl text-justify text-white not-lg:mt-20">
          With the recent changes in the university's systems, both students and
          lecturers at Multimedia University face challenges adapting to the
          switch from MMLS to eBwise and Google to MsTeams. Recently, many
          students have complained about the lack of user-friendliness of the
          new system, preferring the former one.
        </p>
      </div>
    </div>
  );
};

export default About;
