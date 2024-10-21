"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import DeclareResultModal from "src/components/DeclareResultModal";
import JobApplicantModal from "src/components/JobApplicantModal";
import { Badge, BadgeStatus } from "src/components/UI";
import { useJob } from "src/contexts/JobsProvider";
import { truncateText } from "src/utils/helper";

const Recruit = () => {
  const [jobApplicantModal, setJobApplicantModal] = useState<boolean>(false);
  const [declareResultModal, setDeclareResultModal] = useState<boolean>(false);
  const [tokenURI, setTokenURI] = useState<string>("");
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [activeTokenID, setActiveTokenID] = useState<number>(-1);
  const { recruiterJobList } = useJob();
  // console.log(recruiterJobList);
  // const fetchJobsApplications = async () => {};

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]">
      <DeclareResultModal
        isOpen={declareResultModal}
        tokenID={activeTokenID}
        tokenURI={tokenURI}
        selectedApplicants={selectedApplicants}
        setIsOpen={setDeclareResultModal}
      />
      <JobApplicantModal
        isOpen={jobApplicantModal}
        setIsOpen={setJobApplicantModal}
        selectedApplicants={selectedApplicants}
        setSelectedApplicants={setSelectedApplicants}
        activeTokenID={activeTokenID}
        setTokenURI={setTokenURI}
        setActiveTokenID={setActiveTokenID}
        setDeclareResultModal={setDeclareResultModal}
      />
      <div className="w-full flex-center justify-between">
        <h2 className="text-2xl font-semibold my-3">Job Dashboard</h2>
        <Link
          href={"/recruit/create"}
          className="text-blue-700 h-10 hover:text-white border border-blue-700 hover:bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Create Job
        </Link>
      </div>

      <section className=" flex w-full flex-col  justify-around gap-7 rounded-xl bg-gray-100 p-8 md:grow">
        <div className=" flex flex-col gap-5">
          {recruiterJobList?.map(
            ({
              name,
              display_image_url,
              description,
              updated_at,
              identifier,
              metadata_url,
            }) => {
              return (
                <div
                  className={`w-full flex  gap-3 p-4 bg-white rounded-xl cursor-pointer hover:shadow-sm hover:bg-[#FCFCFC] ease-in duration-100`}
                  key={updated_at}
                  onClick={() => {
                    setActiveTokenID(Number(identifier));
                    setJobApplicantModal(true);
                  }}
                >
                  <div className="flex h-[120px] min-w-[120px] rounded-xl bg-[#030712]">
                    <img
                      src={display_image_url}
                      className="h-[120px] w-[120px] rounded-lg"
                    />
                  </div>

                  <div className="w-full h-full flex flex-col gap-3 rounded-xl">
                    <span className="flex  text-lg font-semibold">{name}</span>
                    <div className="flex gap-2">
                      <Badge>Research</Badge>
                      <Badge>Frontend</Badge>
                      <Badge>Solidity</Badge>
                    </div>
                    <p className=" text-[14px] text-[#4B5563]">
                      {truncateText(description, 200)}
                    </p>
                  </div>
                  {/* <div className="py-3">
                    <button
                      type="button"
                      className="text-blue-700 h-10 hover:text-white border border-blue-700 hover:bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Apply
                    </button>
                  </div> */}
                </div>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
};

export default Recruit;
