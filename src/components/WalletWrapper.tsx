"use client";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import { cn, text as dsText, pressable } from "@coinbase/onchainkit/theme";
import { useRouter } from "next/navigation";
import { Briefcase, UserRoundPen } from "lucide-react";
type WalletWrapperParams = {
  text?: string;
  className?: string;
  withWalletAggregator?: boolean;
};
export default function WalletWrapper({
  className,
  text,
  withWalletAggregator = false,
}: WalletWrapperParams) {
  const router = useRouter();
  return (
    <>
      <Wallet>
        <ConnectWallet
          withWalletAggregator={withWalletAggregator}
          text={text}
          className={className}
        >
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick={true}>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownBasename />
          <button
            type="button"
            className={cn(
              pressable.default,
              "relative flex w-full items-center px-4 pt-3 pb-4"
            )}
            onClick={() => router.push("/dashboard")}
          >
            <div className="absolute left-4 flex h-[1.125rem] w-[1.125rem] items-center justify-center">
              <Briefcase size={18} />
            </div>
            <span className={cn(dsText.body, "pl-6")}>Job Dashboard</span>
          </button>
          <button
            type="button"
            className={cn(
              pressable.default,
              "relative flex w-full items-center px-4 pt-3 pb-4"
            )}
            onClick={() => router.push("/profile")}
          >
            <div className="absolute left-4 flex h-[1.125rem] w-[1.125rem] items-center justify-center">
              <UserRoundPen size={18} />
            </div>
            <span className={cn(dsText.body, "pl-6")}>Job Profile</span>
          </button>
          <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com">
            Go to Wallet Dashboard
          </WalletDropdownLink>
          <WalletDropdownFundLink />
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </>
  );
}
