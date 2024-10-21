"use client";
import React, { FormEvent, useState } from "react";
import LoginButton from "src/components/LoginButton";
import SignupButton from "src/components/SignupButton";
import {
  background,
  cn,
  color,
  text as dsText,
  pressable,
} from "@coinbase/onchainkit/theme";
import {
  File,
  FileUser,
  GithubIcon,
  Globe,
  MailIcon,
  Share,
  SquarePen,
  TwitterIcon,
  User,
  X,
} from "lucide-react";
import { Chip, Divider, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const JobProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file selected
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      // Handle file submission
      console.log("Submitting PDF file:", selectedFile);
    } else {
      alert("No file selected");
    }
  };
  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]">
      <h2 className="text-2xl font-semibold my-3">
        Job Profile
        <span className="ml-3"></span>
      </h2>

      <section className=" flex w-full flex-col  justify-around gap-7 rounded-xl bg-gray-100 px-2 md:grow mb-10">
        <div className="flex flex-col px-20 py-10 gap-5">
          <div className="flex justify-between">
            <div>
              <img
                className="w-32 h-32 rounded-lg"
                src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              />
              <div className="text-[18px] font-semibold mt-2 text-center">
                Name
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <button
                className={cn(
                  dsText.headline,

                  "inline-flex min-w-[200px] border-2 border-purple-900 items-center justify-center gap-2 rounded-xl px-4 py-3"
                )}
              >
                Share
                <Share size={18} />
              </button>
              <button
                type="button"
                data-testid="ockConnectButton"
                className={cn(
                  pressable.primary,
                  dsText.headline,
                  color.inverse,
                  "inline-flex min-w-[200px] items-center justify-center gap-2 rounded-xl px-4 py-3"
                )}
                onClick={() => router.push("/profile/edit")}
              >
                Edit
                <SquarePen size={18} />
              </button>
            </div>
          </div>
          <Divider className="my-3" />
          <div className="w-full flex justify-between">
            <div className="w-1/2 flex gap-5">
              <Globe /> <TwitterIcon />
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.2179 1.92959C22.2662 1.63673 22.235 1.33628 22.1277 1.05955C22.0204 0.782822 21.8408 0.539938 21.6077 0.356207C21.3746 0.172475 21.0964 0.0546181 20.8023 0.0149157C20.5081 -0.0247867 20.2087 0.0151178 19.9353 0.130472L1.01465 8.09704C-0.304259 8.65249 -0.371754 10.56 1.01465 11.1354C2.38765 11.7075 3.78046 12.2308 5.19046 12.7044C6.48282 13.1315 7.89246 13.5265 9.02216 13.6382C9.33086 14.0078 9.71924 14.3641 10.1154 14.6894C10.7206 15.1873 11.4486 15.6996 12.201 16.1909C13.7081 17.1756 15.3799 18.1172 16.5063 18.7302C17.8529 19.4605 19.465 18.6196 19.7062 17.1513L22.2179 1.92959ZM3.13575 9.60516L19.87 2.55917L17.5265 16.7662C16.4211 16.1654 14.8289 15.2658 13.4104 14.3386C12.7567 13.9189 12.1255 13.4649 11.5195 12.9788C11.3575 12.8465 11.2003 12.7084 11.0481 12.565L15.4308 8.18335C15.6384 7.97588 15.7551 7.69443 15.7552 7.40091C15.7553 7.1074 15.6388 6.82587 15.4314 6.61825C15.2239 6.41063 14.9425 6.29393 14.6489 6.29383C14.3554 6.29373 14.0739 6.41022 13.8663 6.6177L9.06753 11.4164C8.25538 11.3124 7.12457 11.0115 5.88311 10.6021C4.95889 10.2941 4.04314 9.96134 3.13686 9.60405L3.13575 9.60516Z"
                  fill="black"
                />
              </svg>
              <svg
                width="26"
                height="19"
                viewBox="0 0 26 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.9993 1.57897C20.3526 0.842907 18.5697 0.30867 16.7125 0C16.6798 0.000446034 16.6487 0.0132476 16.6258 0.035616C16.4029 0.42739 16.1429 0.937882 15.9696 1.32966C13.9997 1.04491 11.9965 1.04491 10.0266 1.32966C9.85324 0.92601 9.59323 0.42739 9.35798 0.035616C9.3456 0.0118722 9.30846 0 9.27131 0C7.41412 0.30867 5.6436 0.842907 3.9845 1.57897C3.97212 1.57897 3.95974 1.59084 3.94736 1.60271C0.579648 6.43458 -0.348949 11.1359 0.109159 15.7897C0.109159 15.8134 0.12154 15.8371 0.146302 15.849C2.37493 17.4161 4.5169 18.3659 6.6341 18.9951C6.67124 19.007 6.70839 18.9951 6.72077 18.9713C7.21602 18.3184 7.66175 17.6298 8.04557 16.9056C8.07033 16.8581 8.04557 16.8106 7.99604 16.7988C7.29031 16.5376 6.62172 16.2289 5.96551 15.8728C5.91599 15.849 5.91598 15.7778 5.95313 15.7422C6.08932 15.6472 6.22552 15.5404 6.36171 15.4454C6.38647 15.4216 6.42362 15.4216 6.44838 15.4335C10.7075 17.2974 15.301 17.2974 19.5106 15.4335C19.5354 15.4216 19.5726 15.4216 19.5973 15.4454C19.7335 15.5522 19.8697 15.6472 20.0059 15.754C20.0554 15.7897 20.0554 15.8609 19.9935 15.8846C19.3497 16.2527 18.6687 16.5495 17.963 16.8106C17.9135 16.8225 17.9011 16.8819 17.9135 16.9175C18.3097 17.6417 18.7554 18.3303 19.2383 18.9832C19.2754 18.9951 19.3125 19.007 19.3497 18.9951C21.4793 18.3659 23.6212 17.4161 25.8499 15.849C25.8746 15.8371 25.887 15.8134 25.887 15.7897C26.4318 10.4117 24.9832 5.74601 22.0488 1.60271C22.0364 1.59084 22.024 1.57897 21.9993 1.57897ZM8.68939 12.9523C7.41412 12.9523 6.34933 11.8244 6.34933 10.4354C6.34933 9.04641 7.38936 7.91857 8.68939 7.91857C10.0018 7.91857 11.0418 9.05828 11.0295 10.4354C11.0295 11.8244 9.98943 12.9523 8.68939 12.9523ZM17.3192 12.9523C16.0439 12.9523 14.9791 11.8244 14.9791 10.4354C14.9791 9.04641 16.0191 7.91857 17.3192 7.91857C18.6316 7.91857 19.6716 9.05828 19.6592 10.4354C19.6592 11.8244 18.6316 12.9523 17.3192 12.9523Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="w-1/2 flex justify-end">
              <button
                type="button"
                data-testid="ockConnectButton"
                className={cn(
                  pressable.primary,
                  dsText.headline,
                  color.inverse,
                  "inline-flex min-w-[200px] items-center justify-center gap-2 rounded-xl px-4 py-3"
                )}
                onClick={() => router.push("/profile/edit")}
              >
                Resume
                <FileUser size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobProfile;
