"use client";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { publicClient } from "src/client";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "src/contract/const";
import { Applicant, JobApplication, NftMetadata } from "src/interfaces/const";
import {
  combineArrays,
  filterByApplicantAddress,
  getBatchCalls,
  removeDuplicateApplicants,
} from "src/utils/helper";
import { useAccount } from "wagmi";

interface JobProviderProps {
  children: ReactNode;
}

interface ApiResponse {
  nfts: NftMetadata[];
}

const JobProviderFn = () => {
  const [isGameSidebarOpen, setIsGameSidebarOpen] = useState<boolean>(true);
  const [applicationsList, setApplicationsList] = useState<
    JobApplication[] | null
  >(null);
  const [jobsList, setJobList] = useState<NftMetadata[] | null>(null);
  const [recruiterJobList, setRecruiterJobList] = useState<
    NftMetadata[] | null
  >(null);
  const [jobsLength, setJobsLength] = useState<number>(0);
  const { address } = useAccount();

  const fetchAllJobs = async () => {
    if (address) {
      try {
        const url = `
        https://testnets-api.opensea.io/api/v2/chain/base_sepolia/contract/${CONTRACT_ADDRESS}/nfts`;
        const response = await axios.get<ApiResponse>(url, {
          headers: {
            Accept: "application/json",
          },
        });
        setJobList(response.data.nfts);
        console.log(response.data.nfts);

        const multiCalldata = getBatchCalls(Number(response.data.nfts.length));

        try {
          const data: any = await publicClient.multicall({
            contracts: multiCalldata,
          });

          const result = filterByApplicantAddress(data, address);
          // console.log(result);
          console.log(combineArrays(response.data.nfts, result));

          setApplicationsList(combineArrays(response.data.nfts, result));
        } catch (error) {
          console.error("Error fetching job applications:", error);
          setApplicationsList(null); // Handle error state
          return null;
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        throw error;
      }
    }
  };

  const fetchAllApplicant = async (tokenID: number) => {
    // console.log("tokenID", tokenID);
    if (tokenID >= 0) {
      try {
        const data: any = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "getJobApplicants",
          args: [tokenID],
        });
        // console.log("tokenID", tokenID, "applicant", data);
        const uniqueApplicants = removeDuplicateApplicants(data);
        // console.log("applicant", uniqueApplicants);
        return uniqueApplicants;
      } catch (error) {
        console.error("Error fetching job applications:", error);

        return null;
      }
    }
    return null;
  };

  const fetchRecruiterJobsList = async () => {
    if (address) {
      try {
        const url = `
        https://testnets-api.opensea.io/api/v2/chain/base_sepolia/account/${address}/nfts`;
        const response = await axios.get<ApiResponse>(url, {
          headers: {
            Accept: "application/json",
          },
        });
        // setJobList(response.data.nfts);
        // console.log(response.data.nfts);
        const data = response.data.nfts.filter(
          (nft) =>
            nft.contract.toLocaleLowerCase() ===
            CONTRACT_ADDRESS.toLocaleLowerCase()
        );
        console.log(data);
        setRecruiterJobList(data);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        throw error;
      }
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, [address]);

  useEffect(() => {
    fetchRecruiterJobsList();
  }, [address]);

  return {
    jobsList,
    jobsLength,
    applicationsList,
    recruiterJobList,
    fetchAllApplicant,
  };
};

type JobContextProps = ReturnType<typeof JobProviderFn>;

const JobContext = createContext<JobContextProps | null>(null);

export const JobProvider = ({ children }: JobProviderProps) => {
  return (
    <JobContext.Provider value={JobProviderFn()}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useChatbar must be used within a JobProvider");
  }
  return context;
};
