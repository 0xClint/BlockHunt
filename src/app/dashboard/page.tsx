"use client";
import React, { useState } from "react";

import { Badge, BadgeStatus } from "src/components/UI";

import { useJob } from "src/contexts/JobsProvider";
import Link from "next/link";
import { isStringInArray, truncateText } from "src/utils/helper";
import { useAccount } from "wagmi";
import { daysUntil } from "src/utils/dayConverter";

const Dashboard = () => {
  const { address } = useAccount();
  const { applicationsList } = useJob();

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]">
      <h2 className="text-2xl font-semibold my-3">Application Dashboard</h2>

      <section className=" flex w-full flex-col  justify-around gap-7 rounded-xl bg-gray-100 p-8 md:grow">
        <div className=" flex flex-col gap-5">
          {applicationsList?.map(
            ({
              name,
              image,
              resumeLink,
              result,
              description,
              tokenId,
              categories,
              company,
              deadline,
            }) => {
              let resultdata = false;
              if (address && result && isStringInArray(result, address))
                resultdata = true;

              return (
                <div
                  className={`w-full flex  gap-3 p-4 bg-white rounded-xl`}
                  key={tokenId}
                >
                  <div className="flex h-[120px] min-w-[120px] rounded-xl bg-[#030712]">
                    <img
                      src={image}
                      className="h-[120px] w-[120px] rounded-lg"
                    />
                  </div>
                  <div className="w-full h-full flex flex-col gap-2 p-0 bg-white rounded-xl">
                    <span className="flex  text-lg font-semibold">{name}</span>
                    <div className=" flex flex-center justify-start gap-3">
                      <span className="flex  text-sm text-gray-500 font-semibold">
                        {company}
                      </span>
                      <div className=" flex-center justify-start">
                        {result == "" && (
                          <BadgeStatus status="onprocess">Onreview</BadgeStatus>
                        )}
                        {resultdata && (
                          <BadgeStatus status="accepted">Accepted</BadgeStatus>
                        )}
                        {result != "" && !resultdata && (
                          <BadgeStatus status="rejected">Rejected</BadgeStatus>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {categories?.map((item) => {
                        return <Badge key={item}>{item}</Badge>;
                      })}
                    </div>{" "}
                    <p className=" text-[14px] text-[#4B5563]">
                      {truncateText(description, 90)}
                    </p>
                  </div>
                  <div className="min-w-[105px] flex flex-col justify-between">
                    <Link
                      href={resumeLink}
                      target="_blank"
                      className="text-blue-700 h-10 hover:text-white border border-blue-700 hover:bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Resume
                    </Link>
                    <span className="text-xs font-semibold text-gray-500 text-right">
                      {daysUntil(deadline)} days left
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
