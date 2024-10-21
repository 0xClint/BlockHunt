import { useCallback } from "react";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import type { Address, ContractFunctionParameters } from "viem";
import { BASE_SEPOLIA_CHAIN_ID } from "src/constants";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "src/contract/const";

export default function TransactionComponents() {
  const { address } = useAccount();

  const contracts = [
    {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "applyToJob",
      args: [],
    },
  ] as unknown as ContractFunctionParameters[];
  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log("LifecycleStatus", status);
  }, []);

  return address ? (
    <Transaction
      chainId={BASE_SEPOLIA_CHAIN_ID}
      contracts={contracts}
      onStatus={handleOnStatus}
    >
      <TransactionButton />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
}
