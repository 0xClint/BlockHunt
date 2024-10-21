"use client";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type {
  TransactionError,
  TransactionResponse,
} from "@coinbase/onchainkit/transaction";
import type { Address, ContractFunctionParameters } from "viem";
import { BASE_SEPOLIA_CHAIN_ID } from "../constants";
import { useAccount } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "src/contract/const";

interface TransactionWrapperProps {
  funcName: string;
  args: any[];
  text: string;
  disabled: boolean;
}

export default function TransactionWrapper({
  funcName,
  args,
  text,
  disabled,
}: TransactionWrapperProps) {
  const contracts = [
    {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: funcName,
      args: args,
    },
  ] as unknown as ContractFunctionParameters[];

  console.log(funcName, args, text, disabled);
  const handleError = (err: TransactionError) => {
    console.log("Transaction error:", err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log("Transaction successful", response);
  };

  return (
    <div className="flex w-full">
      <Transaction
        contracts={contracts}
        className="w-full"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton
          className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]"
          text={text}
          disabled={!disabled}
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
