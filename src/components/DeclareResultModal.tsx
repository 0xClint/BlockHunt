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
  tokenURI: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedApplicants: string[];
}

function DeclareResultModal({
  isOpen,
  tokenID,
  tokenURI,
  selectedApplicants,
  setIsOpen,
}: ApplyJobModalProps) {
  const { address } = useAccount();
  const [jobModalPortal, setJobModalPortal] = useState<Element | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    setJobModalPortal(document.getElementById("portal"));
  }, []);
  if (!jobModalPortal) return null;

  const handleClick = () => {
    console.log(tokenID, tokenURI, selectedApplicants);
  };
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
              Submit
            </div>
            {/* <button onClick={() => handleClick()}>Submit</button> */}
            {address ? (
              <TransactionWrapper
                funcName="decideAndUpdateJobURI"
                args={[tokenID, selectedApplicants, tokenURI]}
                text="submit"
                disabled={tokenURI != "" ? true : false}
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

export default DeclareResultModal;
