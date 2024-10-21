import ReactDom from "react-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  File as FileIcon,
  Globe,
  MailIcon,
  TwitterIcon,
  X,
} from "lucide-react";
import { useAccount } from "wagmi";
import { NFTData, NftMetadata } from "src/interfaces/const";
import { Badge } from "./UI";
import { truncateText } from "src/utils/helper";
import { Divider } from "@nextui-org/react";

interface JobPostModalProps {
  isOpen: boolean;
  jobData: NFTData | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  applyJobModal: boolean;
  setActiveTokenID: React.Dispatch<React.SetStateAction<number>>;
  setApplyJobModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function JobPostModal({
  isOpen,
  jobData,
  applyJobModal,
  setApplyJobModal,
  setActiveTokenID,
  setIsOpen,
}: JobPostModalProps) {
  const { address } = useAccount();
  const [jobPostModalPortal, setJobPostModalPortal] = useState<Element | null>(
    null
  );

  const [resume, setResume] = useState<File | null>(null);
  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    setJobPostModalPortal(document.getElementById("portal"));
  }, []);
  if (!jobPostModalPortal) return null;

  return ReactDom.createPortal(
    <>
      {isOpen && (
        <div className="fixed inset-0 top-0 left-0 h-screen w-screen p-4 flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
          <motion.div
            className="md:w-[700px] min-h-[800px] w-full border border-solid border-[#D1D5DB] bg-[#F9FAFB] p-6 relative flex flex-col gap-4 rounded-md overflow-y-auto"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <X
              className="w-5 h-5 absolute top-[14px] right-4 hover:cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                setActiveTokenID(-1);
              }}
            />

            <div className="w-full h-full text-xl font-semibold flex flex-col gap-y-4">
              Apply
            </div>
            <div className="w-full h-full flex-col  gap-3 p-4  rounded-xl cursor-pointer ease-in duration-100 flex-grow">
              <div className="w-full flex h-full gap-10 p-4  rounded-xl cursor-pointer ease-in duration-100">
                <div className="flex h-[170px] min-w-[170px] rounded-xl bg-[#030712]">
                  <img
                    src={jobData?.image}
                    className="h-[170px] w-[170px] rounded-lg"
                  />
                </div>
                <div className="w-full h-full flex flex-col gap-3 rounded-xl">
                  <span className="flex  text-3xl font-semibold">
                    {jobData?.name}
                  </span>
                  <div className="flex gap-2">
                    {jobData?.categories?.map((item) => {
                      return <Badge key={item}>{item}</Badge>;
                    })}
                  </div>
                  <p>Remote</p>
                  <Divider />
                  <div className="w-1/2 flex gap-5">
                    <MailIcon />
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
                </div>
              </div>
              <p className=" text-md h-full text-[#4B5563] p-4 leading-7 flex-center flex-grow">
                {jobData?.description}
              </p>
            </div>
            <div className="mx-auto flex-center">
              <button
                type="button"
                onClick={() => {
                  setApplyJobModal(true);
                }}
                className="text-blue-700 w-[200px] h-10 hover:text-white border border-blue-700 hover:bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>,
    jobPostModalPortal
  );
}

export default JobPostModal;
