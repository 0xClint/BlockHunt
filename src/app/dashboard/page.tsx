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

const Dashboard = () => {
  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]">
      <h2 className="text-2xl font-semibold my-3">
        Job Dashboard
        <span className="ml-3">
          <button
            type="button"
            data-testid="ockConnectButton"
            className={cn(
              pressable.primary,
              dsText.headline,
              color.inverse,
              "inline-flex min-w-[100px] items-center justify-center gap-2 rounded-xl px-4 py-3"
            )}
          >
            Edit
            <SquarePen size={18} />
          </button>
        </span>
      </h2>

      <section className=" flex w-full flex-col  justify-around gap-7 rounded-xl bg-gray-100 px-2 py-8 md:grow">
        <div className=" flex gap-5 px-5">
          <div className="flex h-[150px] min-w-[150px] rounded-xl bg-[#030712]"></div>
          <div className={` flex-auto p-4 bg-white rounded-xl`}>
            <span className="flex h-10 text-lg font-semibold">
              Job Profile
              <span className="ml-2 py-auto">
                <Chip color="primary" size="sm">
                  Status
                </Chip>
              </span>
            </span>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
