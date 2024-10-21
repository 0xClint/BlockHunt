import ReactDom from "react-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Cross,
  CrossIcon,
  DoorClosedIcon,
  File as FileIcon,
  X,
} from "lucide-react";
import { useAccount } from "wagmi";
import TransactionWrapper from "./TransactionWrapper";
import WalletWrapper from "./WalletWrapper";
import { uploadFile } from "src/utils/Lighthouse";

interface ApplyJobModalProps {
  isOpen: boolean;
  tokenID: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ApplyJobModal({ isOpen, tokenID, setIsOpen }: ApplyJobModalProps) {
  const { address } = useAccount();
  const [jobModalPortal, setJobModalPortal] = useState<Element | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]); // Set the selected file
      if (e.target.files) {
        const getHash = await uploadFile(e.target.files);
        console.log(getHash);
        setCid(`https://gateway.lighthouse.storage/ipfs/${getHash}`);
      }
    }
  };

  useEffect(() => {
    setJobModalPortal(document.getElementById("portal"));
  }, []);
  if (!jobModalPortal) return null;

  return ReactDom.createPortal(
    <>
      {isOpen && (
        <div className="fixed inset-0 top-0 left-0 h-screen w-screen p-4 flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
          <motion.div
            className="md:w-[450px] w-full border border-solid border-[#D1D5DB] bg-[#F9FAFB] p-6 relative flex flex-col gap-4 rounded-md overflow-y-auto"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <X
              className="w-5 h-5 absolute top-[14px] right-4 hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            <div
              className={
                "w-full h-full text-xl font-semibold flex flex-col gap-y-4"
              }
            >
              Apply
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-900 ">
                Upload Resume
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FileIcon size={17} />
                </div>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChangeCapture={handleFileChange}
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2"
                  placeholder="portfolio.com"
                />
              </div>
            </div>

            {/* <button
                // onClick={() => setIsOpen(false)}
                type="submit"
                className="w-full text-white bg-[#4F46E5] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <span className="text-white font-inter font-regular text-sm">
    
                </span>
              </button> */}
            {address ? (
              <TransactionWrapper
                funcName="applyToJob"
                args={[tokenID, cid]}
                text="submit"
                disabled={cid != null ? true : false}
              />
            ) : (
              <WalletWrapper
                className="w-[450px] max-w-full"
                text="Sign in to transact"
              />
            )}
          </motion.div>
        </div>
      )}
    </>,
    jobModalPortal
  );
}

export default ApplyJobModal;
