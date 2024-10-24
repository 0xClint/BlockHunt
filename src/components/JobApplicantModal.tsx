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
import { uploadFile, uploadText } from "src/utils/Lighthouse";
import { useJob } from "src/contexts/JobsProvider";
import { Applicant } from "src/interfaces/const";
import { Checkbox } from "@nextui-org/react";
import { getMetadataUrlByIdentifier, updateTraitValue } from "src/utils/helper";
import axios from "axios";

interface ApplyJobModalProps {
  isOpen: boolean;
  activeTokenID: number;
  setActiveTokenID: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenURI: React.Dispatch<React.SetStateAction<string>>;
  setDeclareResultModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedApplicants: React.Dispatch<React.SetStateAction<string[]>>;
  selectedApplicants: string[];
}

function JobApplicantModal({
  isOpen,
  activeTokenID,
  setActiveTokenID,
  setTokenURI,
  setDeclareResultModal,
  setSelectedApplicants,
  selectedApplicants,
  setIsOpen,
}: ApplyJobModalProps) {
  const { fetchAllApplicant, recruiterJobList } = useJob();

  const [jobModalPortal, setJobModalPortal] = useState<Element | null>(null);
  const [applicantsList, setApplicantsList] = useState<Applicant[] | null>(
    null
  );
  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleCheckboxChange = (
    applicantAddress: string,
    isChecked: boolean
  ) => {
    setSelectedApplicants((prevSelected) => {
      if (isChecked) {
        // Add the applicant if it's selected
        return [...prevSelected, applicantAddress];
      } else {
        // Remove the applicant if it's deselected
        return prevSelected.filter((address) => address !== applicantAddress);
      }
    });
  };

  const declareResult = async () => {
    // console.log(recruiterJobList);
    const oldTokenURL = getMetadataUrlByIdentifier(
      recruiterJobList,
      activeTokenID.toString()
    );
    let res = await axios.get(oldTokenURL || "");
    res = res.data;
    console.log(res);
    updateTraitValue(res, selectedApplicants);
    const newCID = await uploadText(res);
    setTokenURI(`https://gateway.lighthouse.storage/ipfs/${newCID}`);
    setDeclareResultModal(true);
  };

  const fetchAllApplicantFunc = async () => {
    setApplicantsList(await fetchAllApplicant(activeTokenID));
  };

  useEffect(() => {
    fetchAllApplicantFunc();
  }, [activeTokenID]);

  useEffect(() => {
    setJobModalPortal(document.getElementById("portal"));
  }, []);
  if (!jobModalPortal) return null;

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
                setSelectedApplicants([]);
              }}
            />

            <div className="w-full h-full text-xl font-semibold flex flex-col gap-y-4">
              Recruit
            </div>

            <div className="relative overflow-x-auto sm:rounded-lg flex flex-col flex-grow">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Applicant Name
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Resume
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Recruit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applicantsList?.map(
                    ({ applicantAddress, resumeCID }, index) => {
                      return (
                        <tr
                          className="odd:bg-white  even:bg-gray-50  border-b"
                          key={index}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {applicantAddress}
                          </th>
                          <td className="px-6 py-4">
                            <a
                              href={resumeCID}
                              target="_blank"
                              className="font-medium text-blue-600 d hover:underline"
                            >
                              Download
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <Checkbox
                              size="sm"
                              checked={selectedApplicants.includes(
                                applicantAddress
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  applicantAddress,
                                  e.target.checked
                                )
                              }
                            ></Checkbox>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Selected Applicants:</h3>
                <ul>
                  {selectedApplicants.length > 0 ? (
                    selectedApplicants.map((address) => (
                      <li key={address} className="text-gray-700">
                        {address}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No applicants selected</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="flex-center">
              <button
                onClick={() => {
                  declareResult();
                }}
                disabled={selectedApplicants.length < 1}
                type="submit"
                className={`${selectedApplicants.length < 1 ? "opacity-50" : "opacity-100 hover:bg-blue-800"} w-[200px] opacity-0 text-white bg-[#4F46E5] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5`}
              >
                <span className="text-white font-inter font-regular text-sm">
                  Submit
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>,
    jobModalPortal
  );
}

export default JobApplicantModal;
