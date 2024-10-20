"use client";
import React from "react";
import LoginButton from "src/components/LoginButton";
import SignupButton from "src/components/SignupButton";
import {
  cn,
  color,
  text as dsText,
  pressable,
} from "@coinbase/onchainkit/theme";
import { SquarePen } from "lucide-react";
import { Chip } from "@nextui-org/react";
import { Badge, BadgeStatus } from "src/components/UI";

const tempJobs = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
];

const Dashboard = () => {
  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]">
      <h2 className="text-2xl font-semibold my-3">Job Dashboard</h2>

      <section className=" flex w-full flex-col  justify-around gap-7 rounded-xl bg-gray-100 p-8 md:grow">
        <div className=" flex flex-col gap-5">
          {tempJobs.map(({ id }) => {
            return (
              <div
                className={`w-full flex  gap-3 p-4 bg-white rounded-xl`}
                key={id}
              >
                <div className="flex h-[120px] min-w-[120px] rounded-xl bg-[#030712]"></div>

                <div className="w-full h-full flex flex-col gap-3 p-4 bg-white rounded-xl">
                  <span className="flex  text-lg font-semibold">
                    Engineering Internship Summer 2025
                  </span>
                  <div className=" flex-center justify-start">
                    <BadgeStatus status="accepted">Accepted</BadgeStatus>
                  </div>
                  <div className="flex gap-2">
                    <Badge>Research</Badge>
                    <Badge>Frontend</Badge>
                    <Badge>Solidity</Badge>
                  </div>
                </div>
                <div className="py-3 min-w-[105px]">
                  <button
                    type="button"
                    className="text-blue-700 h-10 hover:text-white border border-blue-700 hover:bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Get Stake
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
