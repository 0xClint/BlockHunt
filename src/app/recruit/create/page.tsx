"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Briefcase,
  Building,
  Calendar,
  File,
  GithubIcon,
  Globe,
  MailIcon,
  MapIcon,
  TwitterIcon,
  User,
} from "lucide-react";
import { Select, Selection, SelectItem } from "@nextui-org/react";
import { uploadFile, uploadText } from "src/utils/Lighthouse";
import SubmitJobModal from "src/components/SubmitJobModal";

const constcategoryList = [
  { key: "Javascript", value: "Javascript" },
  { key: "Solidity", value: "Solidity" },
  { key: "Base", value: "Base" },
  { key: "EVM", value: "EVM" },
  { key: "Okto", value: "Okto" },
  { key: "Base India", value: "Base India" },
  { key: "SmartWallet", value: "SmartWallet" },
  { key: "DeFi", value: "DeFi" },
  { key: "Onchainkit", value: "Onchainkit" },
  { key: "Gaming", value: "Gaming" },
  { key: "P2P", value: "P2P" },
  { key: "Zk", value: "Zk" },
];

const CreateJob = () => {
  // Form fields state
  const [tokenURI, setTokenURI] = useState<string>("");
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobType, setJobType] = useState("FullTime");
  const [location, setLocation] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [cid, setCid] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = React.useState<Selection>(
    new Set([])
  );

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTags(new Set(e.target.value.split(",")));
  };

  // File upload handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files) {
        const getHash = await uploadFile(e.target.files);
        console.log(getHash);
        setCid(`https://gateway.lighthouse.storage/ipfs/${getHash}`);
      }
    }
  };

  // Form submit handler
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      description,
      external_url: website,
      image: cid,
      name: jobTitle,
      attributes: [
        {
          trait_type: "Company",
          value: companyName,
        },
        {
          trait_type: "Type",
          value: jobType,
        },
        {
          trait_type: "Location",
          value: location,
        },
        {
          trait_type: "Deadline",
          value: applicationDeadline,
        },
        {
          trait_type: "Result",
          value: "",
        },
        {
          trait_type: "Categories",
          value: Array.from(selectedTags),
          //   value: JSON.stringify(Array.from(selectedTags)),
        },
        {
          trait_type: "Socials",
          value: [website, email, github, twitter, discord, telegram],
        },
      ],
    };

    const getHash = await uploadText(formData);
    setTokenURI(`https://gateway.lighthouse.storage/ipfs/${getHash}`);
    setJobModalOpen(true);
  };

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]">
      <SubmitJobModal
        setIsOpen={setJobModalOpen}
        tokenURI={tokenURI}
        isOpen={jobModalOpen}
      />
      <h2 className="text-2xl font-semibold my-3">Create Job</h2>

      <section className="flex w-full flex-col justify-around gap-7 rounded-xl bg-gray-100 px-2 md:grow mb-10">
        <form
          className="flex flex-col px-20 py-10 gap-5"
          onSubmit={handleSubmit}
        >
          {/* Job Title and Company Name */}
          <div className="flex gap-8">
            <div className="w-1/2">
              <label className="block mb-2 font-medium text-gray-900">
                Job Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Briefcase size={17} />
                </div>
                <input
                  type="text"
                  required
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block mb-2 font-medium text-gray-900">
                Company Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Building size={17} />
                </div>
                <input
                  type="text"
                  required
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Job Type and Location */}
          <div className="flex gap-8">
            <div className="w-1/2">
              <label className="block mb-2 font-medium text-gray-900">
                Job Type
              </label>
              <div className="relative">
                <select
                  id="jobType"
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="FullTime">Full-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>

            <div className="w-1/2">
              <label className="block mb-2 font-medium text-gray-900">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <MapIcon size={17} />
                </div>
                <input
                  type="text"
                  required
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Application Deadline and Email */}
          <div className="flex gap-8">
            <div className="w-1/2">
              <label className="block mb-2 font-medium text-gray-900">
                Application Deadline
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Calendar size={17} />
                </div>
                <input
                  type="date"
                  required
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  value={applicationDeadline}
                  onChange={(e) => setApplicationDeadline(e.target.value)}
                />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block mb-2 font-medium text-gray-900">
                Email Support
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <MailIcon size={17} />
                </div>
                <input
                  type="email"
                  required
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  placeholder="support@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Website URL and Upload PDF */}
          <div className="flex gap-8">
            <div className="w-1/2">
              <label className="block mb-2 font-medium text-gray-900">
                Website URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Globe size={17} />
                </div>
                <input
                  type="url"
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  placeholder="company.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block mb-2 font-medium text-gray-900">
                Upload Campaign
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <File size={17} />
                </div>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="w-full max-w-xs flex-col gap-2">
              <Select
                label="Favorite Animal"
                selectionMode="multiple"
                placeholder="Select an animal"
                selectedKeys={selectedTags}
                className="max-w-xs"
                onChange={handleSelectionChange}
              >
                {constcategoryList.map((item) => (
                  <SelectItem key={item.key}>{item.value}</SelectItem>
                ))}
              </Select>
              <p className="text-small text-default-500">
                Selected: {Array.from(selectedTags).join(", ")}
              </p>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Your message
            </label>
            <textarea
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Company Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/* Social Media Links */}
          <h3 className="text-xl font-semibold mt-3">Socials</h3>
          <div>
            <label className="block mb-2 font-medium text-gray-900">
              Github
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <GithubIcon size={17} />
              </div>
              <input
                type="url"
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="github.com/username"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-900">
              Twitter
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <TwitterIcon size={17} />
              </div>
              <input
                type="url"
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="twitter.com/username"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-900">
              Discord
            </label>
            <div className="relative">
              <input
                type="url"
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="discord.com/invite"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-900">
              Telegram
            </label>
            <div className="relative">
              <input
                type="url"
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="t.me/username"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex-center">
            <button
              type="submit"
              className="text-white w-[500px] mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateJob;
