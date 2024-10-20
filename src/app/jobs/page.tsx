"use client";
import React from "react";

import { Search } from "lucide-react";
import { Badge } from "src/components/UI";

const tempText: string = `Pursuing a Bachelors (Juniors/Seniors only), Masters, or PhD with
a focus on subjects related to software development, computer
science and/or mathematics Professional experience coding in at
least two general purpose programming language, preferably Java,
Typescript or Python Interest in the blockchain space,
demonstrated with course work, extracurriculars, open source
contributions and/or work experience At least one previous
Software Engineering internship with proven ability to execute and
exposure to real-world systems Strong verbal and written English
communication skills Exposure to web application development,
Unix/Linux environments, distributed and parallel systems, and
networking is a plus Ability to work onsite in San Francisco or
New York`;

const Jobs = () => {
  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]">
      <h2 className="text-2xl font-semibold my-3">Jobs</h2>
      <section className="w-full h-60 bg-[#4F46E5] rounded-xl"></section>
      <div className="w-full flex justify-between my-5 gap-3">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Search size={15} />
          </div>
          <input
            type="url"
            className="bg-white border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-10 p-2.5"
            placeholder="Search Jobs..."
          />
        </div>
        <div>
          <button className="relative inline-flex items-center justify-center  p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 ">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Search
            </span>
          </button>
        </div>
      </div>
      <section className=" flex w-full flex-col  justify-around gap-7 rounded-xl bg-gray-100 px-8 py-8 md:grow">
        <div className=" flex gap-5">
          <div className="flex h-[150px] min-w-[150px] rounded-xl bg-[#030712]"></div>
          <div className={` flex-auto p-4 bg-white rounded-xl`}>
            <span className="flex h-10 text-lg font-semibold">
              Engineering Internship Summer 2025
            </span>
            <div className="flex gap-2">
              <Badge>Research</Badge>
              <Badge>Frontend</Badge>
              <Badge>Solidity</Badge>
            </div>
            {/* <p className="text-sm">{truncateText(tempText, 300)}</p> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
