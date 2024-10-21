import { CONTRACT_ABI, CONTRACT_ADDRESS } from "src/contract/const";
import {
  Applicant,
  JobApplicantRequest,
  JobApplication,
  NftMetadata,
  ResultObject,
} from "src/interfaces/const";

export function truncateText(text: string, maxChars: number): string {
  if (text.length > maxChars) {
    return `${text.substring(0, maxChars)}...`;
  }
  return text;
}

export const getBatchCalls = (count: number): any[] => {
  const requests: any[] = [];

  for (let i = 0; i < count; i++) {
    requests.push({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "getJobApplicants",
      args: [i],
    });
  }

  return requests;
};

interface FilteredApplicant extends Applicant {
  tokenId: number;
}

export const filterByApplicantAddress = (
  data: ResultObject[],
  targetAddress: any
): FilteredApplicant[] => {
  const matchingApplicants: FilteredApplicant[] = [];

  data.forEach((item, tokenId) => {
    const filtered = item.result
      .filter((applicant) => applicant.applicantAddress === targetAddress)
      .map((applicant) => ({
        ...applicant,
        tokenId, // Include the index of the outer element
      }));

    matchingApplicants.push(...filtered);
  });

  return matchingApplicants;
};

export const combineArrays = (
  jobNFTs: NftMetadata[],
  applicants: FilteredApplicant[]
): JobApplication[] => {
  const combinedArray: JobApplication[] = [];

  applicants.forEach((applicant) => {
    const matchingJob = jobNFTs.find(
      (job) => job.identifier === applicant.tokenId.toString()
    );
    if (matchingJob) {
      combinedArray.push({
        applicantAddress: applicant.applicantAddress,
        resumeCID: applicant.resumeCID,
        tokenId: applicant.tokenId,
        name: matchingJob.name,
        description: matchingJob.description,
        display_image_url: matchingJob.display_image_url,
        metadata_url: matchingJob.metadata_url,
        opensea_url: matchingJob.opensea_url,
        updated_at: matchingJob.updated_at,
      });
    }
  });

  return combinedArray;
};

export const removeDuplicateApplicants = (
  applicants: Applicant[]
): Applicant[] => {
  return applicants.filter(
    (applicant, index, self) =>
      index ===
      self.findIndex((t) => t.applicantAddress === applicant.applicantAddress)
  );
};
