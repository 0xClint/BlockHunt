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
import { JobApplication, NFTData, NftMetadata } from "src/interfaces/const";
import {
  flattenAttributes,

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
  const [jobsList, setJobList] = useState<NFTData[] | null>(null);
  const [recruiterJobList, setRecruiterJobList] = useState<
    NftMetadata[] | null
  >(null);
  const [jobsLength, setJobsLength] = useState<number>(0);
  const { address } = useAccount();

  const fetchAllJobs = async () => {
    try {
      const data: any = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "getAllJobs",
        args: [],
      });
      console.log(data);
      const indices = data[0];
      const links = data[1];

      let tempdata = [];
      console.log(data);
      for (let i = 0; i < data[0].length; i++) {
        const res = await axios.get(data[1][i]);
        let temp = flattenAttributes(res.data);
        // console.log(temp);
        temp.tokenId = Number(data[0][i]);

        tempdata.push(temp);
      }
      console.log(tempdata);

      setJobList(tempdata);
      return tempdata;
    } catch (error) {
      console.error("Error fetching job applications:", error);
      return null;
    }
  };

  const getUserApplications = async () => {
    if (address) {
      try {
        const data: any = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "getMyApplications",
          args: [address],
        });
        let tempdata = [];
        console.log(data);
        for (let i = 0; i < data[0].length; i++) {
          const res = await axios.get(data[2][i]);
          let temp = flattenAttributes(res.data);

          temp.tokenId = Number(data[0][i]);
          temp.resumeLink = data[1][i];
          tempdata.push(temp);
        }
        console.log(tempdata);
        setApplicationsList(tempdata);
        // return data;
      } catch (error) {
        console.error("Error fetching job applications:", error);

        // return null;
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
        console.log("applicant", uniqueApplicants);
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
        console.log(response.data.nfts);
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

  useEffect(() => {
    getUserApplications();
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
