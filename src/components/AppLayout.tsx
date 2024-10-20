"use client";
import Link from "next/link";
import React from "react";
import LoginButton from "src/components/LoginButton";
import SignupButton from "src/components/SignupButton";
import { useAccount } from "wagmi";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}
const AppLayout = ({ children }: LayoutProps) => {
  const { address } = useAccount();
  return (
    <div className="flex flex-col min-h-screen">
      <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
          <Link href={"/"} title="Careers on Base">
            CareersonBase
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/jobs">
              <button
                type="button"
                className="text-blue-700  hover:text-white border border-blue-700 hover:bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
              >
                Search for jobs
              </button>
            </Link>
            <SignupButton />
            {!address && <LoginButton />}
          </div>
        </div>
      </section>
      <section className="flex-grow">{children}</section>
      <Footer />
    </div>
  );
};

export default AppLayout;
