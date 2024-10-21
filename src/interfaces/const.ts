export interface NftMetadata {
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string;
  description: string;
  image_url: string;
  display_image_url: string;
  display_animation_url: string | null;
  metadata_url: string;
  opensea_url: string;
  updated_at: string; // Date in ISO format, can be a string
  is_disabled: boolean;
  is_nsfw: boolean;
}

export interface ApiResponse {
  nfts: NftMetadata[]; // Assuming nfts is an array of NftMetadata
}

export interface Applicant {
  applicantAddress: string;
  resumeCID: string;
}

export interface JobApplicantRequest {
  address: string;
  abi: any;
  functionName: string;
  args: number[];
}

export interface ResultObject {
  result: Applicant[];
  status: string;
}
export interface JobApplication {
  applicantAddress: string;
  resumeCID: string;
  tokenId: number;
  name: string;
  description: string;
  display_image_url: string;
  metadata_url: string;
  opensea_url: string;
  updated_at: string;
}
