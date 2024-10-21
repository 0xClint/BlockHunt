"use client";
import React, {  useState } from "react";
import { Search } from "lucide-react";
import { Badge, BadgeLink } from "src/components/UI";
import { NFTData,  } from "src/interfaces/const";
import { useJob } from "src/contexts/JobsProvider";
import ApplyJobModal from "src/components/ApplyJobModal";
import { truncateText } from "src/utils/helper";
import JobPostModal from "src/components/JobPostModal";
import { daysUntil } from "src/utils/dayConverter";

const Jobs = () => {
  const { jobsList } = useJob();
  const [activeTokenID, setActiveTokenID] = useState<number>(0);
  const [applyModalOpen, setApplyModalOpen] = useState<boolean>(false);
  const [jobPostModalOpen, setJobPostModalOpen] = useState<boolean>(false);
  const [activeJobData, setActiveJobData] = useState<NFTData | null>(null);
  console.log(jobsList);
  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]">
      <JobPostModal
        isOpen={jobPostModalOpen}
        jobData={activeJobData}
        setIsOpen={setJobPostModalOpen}
        applyJobModal={applyModalOpen}
        setActiveTokenID={setActiveTokenID}
        setApplyJobModal={setApplyModalOpen}
      />
      <ApplyJobModal
        isOpen={applyModalOpen}
        tokenID={activeTokenID}
        setIsOpen={setApplyModalOpen}
      />
      <h2 className="text-2xl font-semibold my-3">Jobs</h2>
      {/* <section className="w-full h-60 bg-[#4F46E5] rounded-xl"></section> */}
      <div className="w-full flex justify-between mt-5 mb-2 gap-3">
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
          <button
            // onClick={() => TransactionWrapper()}
            className="relative inline-flex items-center justify-center  p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 "
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Search
            </span>
          </button>
        </div>
      </div>
      <div className="mt-2 mb-5 flex justify-center flex-wrap gap-2">
        <BadgeLink>Frontend </BadgeLink>
        <BadgeLink>Backend </BadgeLink>
        <BadgeLink>Data Scientist </BadgeLink>
        <BadgeLink>Full Stack </BadgeLink>
        <BadgeLink>Blockchain Developer </BadgeLink>
        <BadgeLink>Security Engineer</BadgeLink>
        <BadgeLink>AI Engineer </BadgeLink>
        <BadgeLink>Dev Rel</BadgeLink>
        <BadgeLink>ML Engineer</BadgeLink>
        <BadgeLink>Game Developer</BadgeLink>
      </div>
      <section className=" flex w-full flex-col  justify-around gap-7 rounded-xl bg-gray-100 px-8 py-8 md:grow">
        <div className=" flex flex-col gap-5">
          {jobsList?.map((info) => {
            return (
              <div
                className={`w-full flex  gap-3 p-4 bg-white rounded-xl cursor-pointer hover:shadow-sm hover:bg-[#FCFCFC] ease-in duration-100`}
                key={info.tokenId}
                onClick={() => {
                  setJobPostModalOpen(true);
                  setActiveJobData(info);
                  setActiveTokenID(info.tokenId);
                }}
              >
                <div className="flex h-[120px] min-w-[120px] rounded-xl bg-[#030712]">
                  <img
                    src={info?.image}
                    className="h-[120px] w-[120px] rounded-lg"
                  />
                </div>

                <div className="w-full h-full flex flex-col gap-1 rounded-xl">
                  <span className="flex  text-lg font-semibold">
                    {info.name}
                  </span>
                  <span className="flex  text-sm text-gray-500 font-semibold">
                    {info.company}
                  </span>
                  <div className="flex gap-2">
                    {info.categories?.map((item) => {
                      return <Badge key={item}>{item}</Badge>;
                    })}
                  </div>
                  <p className=" text-[14px] text-[#4B5563]">
                    {truncateText(info.description, 200)}
                  </p>
                </div>
                <div className=" flex flex-col justify-between">
                  <button
                    type="button"
                    className="text-blue-700  hover:text-white border border-blue-700 hover:bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Apply
                  </button>
                  <span className="text-xs font-semibold text-gray-500 text-right">
                    {daysUntil(info.deadline)} days left
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Jobs;
