import lighthouse from "@lighthouse-web3/sdk";
import { NEXT_PUBLIC_LIGHTHOUSE_API_KEY } from "src/config";

export const uploadFile = async (data: FileList) => {
  const lighthouseApiKey = NEXT_PUBLIC_LIGHTHOUSE_API_KEY ?? "";
  console.log(data);
    const output = await lighthouse.upload(data, lighthouseApiKey);
    console.log("File Status:", output.data.Hash);
    return output.data.Hash;
};
