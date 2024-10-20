"use client";
import Link from "next/link";
import React from "react";
import LoginButton from "src/components/LoginButton";
import SignupButton from "src/components/SignupButton";
import { useAccount } from "wagmi";

interface LayoutProps {
  children: React.ReactNode;
}
const AppLayout = ({ children }: LayoutProps) => {
  const { address } = useAccount();
  return (
    <div>
      <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
          <Link href={"/"} title="Carrer on Base">
            CarreronBase
          </Link>
          <div className="flex items-center gap-3">
            <SignupButton />
            {!address && <LoginButton />}
          </div>
        </div>
      </section>
      <section>{children}</section>
    </div>
  );
};

export default AppLayout;
