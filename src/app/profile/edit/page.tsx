"use client";
import React, { useState } from "react";
import {
  background,
  cn,
  color,
  text as dsText,
  pressable,
} from "@coinbase/onchainkit/theme";
import {
  File,
  GithubIcon,
  Globe,
  MailIcon,
  SquarePen,
  TwitterIcon,
  User,
  X,
} from "lucide-react";

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      <h2 className="text-2xl font-semibold my-3">Edit Profile</h2>

      <section className=" flex w-full flex-col  justify-around gap-7 rounded-xl bg-gray-100 px-2 md:grow mb-10">
        <form
          className="flex flex-col px-20 py-10 gap-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              First name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <User size={17} />
              </div>
              <input
                type="text"
                required
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="John"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              Last name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <User size={17} />
              </div>
              <input
                type="text"
                required
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Cena"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <MailIcon size={17} />
              </div>
              <input
                type="email"
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="name@base.xyz"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              Website URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Globe size={17} />
              </div>
              <input
                type="url"
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="portfolio.com"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              Upload Resume
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <File size={17} />
              </div>
              <input
                type="file"
                required
                accept="application/pdf"
                onChange={handleFileChange}
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"
                placeholder="portfolio.com"
              />
            </div>
          </div>
          <h3 className="text-xl font-semibold mt-3">Socials</h3>
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              Github
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <GithubIcon size={17} />
              </div>
              <input
                type="url"
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="github.com/john"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              Twitter
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <TwitterIcon size={17} />
              </div>
              <input
                type="url"
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="github.com/john"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              Discord
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8458 0.831035C10.9591 0.443635 9.99905 0.162458 8.99902 0C8.98144 0.000234755 8.96466 0.00697243 8.95235 0.0187453C8.83235 0.224942 8.69235 0.493622 8.59901 0.699819C7.53831 0.549952 6.45963 0.549952 5.39892 0.699819C5.30559 0.487374 5.16558 0.224942 5.03891 0.0187453C5.03225 0.00624851 5.01225 0 4.99225 0C3.99222 0.162458 3.03886 0.443635 2.1455 0.831035C2.13883 0.831035 2.13217 0.837283 2.1255 0.843532C0.312118 3.38662 -0.187896 5.86098 0.0587777 8.31035C0.0587777 8.32284 0.0654445 8.33534 0.0787782 8.34159C1.27881 9.16638 2.43218 9.66625 3.57221 9.99741C3.59221 10.0037 3.61221 9.99741 3.61888 9.98491C3.88555 9.64125 4.12556 9.27885 4.33223 8.8977C4.34556 8.8727 4.33223 8.84771 4.30556 8.84146C3.92555 8.704 3.56554 8.54154 3.2122 8.35409C3.18553 8.34159 3.18553 8.3041 3.20553 8.28536C3.27887 8.23537 3.3522 8.17913 3.42554 8.12915C3.43887 8.11665 3.45887 8.11665 3.4722 8.1229C5.7656 9.10389 8.239 9.10389 10.5057 8.1229C10.5191 8.11665 10.5391 8.11665 10.5524 8.12915C10.6257 8.18538 10.6991 8.23537 10.7724 8.2916C10.7991 8.31035 10.7991 8.34784 10.7657 8.36034C10.4191 8.55403 10.0524 8.71024 9.67237 8.84771C9.64571 8.85396 9.63904 8.8852 9.64571 8.90394C9.85905 9.2851 10.0991 9.6475 10.3591 9.99116C10.3791 9.99741 10.3991 10.0037 10.4191 9.99741C11.5658 9.66625 12.7191 9.16638 13.9192 8.34159C13.9325 8.33534 13.9392 8.32284 13.9392 8.31035C14.2325 5.47983 13.4525 3.02422 11.8724 0.843532C11.8658 0.837283 11.8591 0.831035 11.8458 0.831035ZM4.6789 6.81699C3.99222 6.81699 3.41887 6.22339 3.41887 5.49233C3.41887 4.76127 3.97889 4.16767 4.6789 4.16767C5.38559 4.16767 5.94561 4.76752 5.93894 5.49233C5.93894 6.22339 5.37892 6.81699 4.6789 6.81699ZM9.3257 6.81699C8.63901 6.81699 8.06566 6.22339 8.06566 5.49233C8.06566 4.76127 8.62568 4.16767 9.3257 4.16767C10.0324 4.16767 10.5924 4.76752 10.5857 5.49233C10.5857 6.22339 10.0324 6.81699 9.3257 6.81699Z"
                    fill="black"
                  />
                </svg>
              </div>
              <input
                type="url"
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="github.com/john"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              Telegram
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-3.5 pointer-events-none">
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.9859 1.23305C15.0168 1.04553 14.9968 0.853162 14.9281 0.675976C14.8594 0.49879 14.7444 0.343274 14.5951 0.225633C14.4459 0.107992 14.2678 0.0325299 14.0795 0.00710894C13.8911 -0.018312 13.6994 0.00723835 13.5243 0.0810984L1.40968 5.18199C0.565196 5.53764 0.52198 6.75902 1.40968 7.12742C2.28879 7.49371 3.18059 7.82878 4.0834 8.13201C4.91088 8.40548 5.81345 8.6584 6.53679 8.72995C6.73445 8.96658 6.98312 9.1947 7.23674 9.40299C7.62427 9.72179 8.09044 10.0498 8.57219 10.3644C9.53711 10.9949 10.6076 11.5978 11.3288 11.9903C12.191 12.4579 13.2232 11.9194 13.3777 10.9793L14.9859 1.23305ZM2.76779 6.14762L13.4825 1.63616L11.982 10.7328C11.2742 10.3481 10.2548 9.77209 9.34653 9.1784C8.92794 8.90963 8.5238 8.61899 8.13578 8.30771C8.03208 8.22298 7.93141 8.13461 7.83397 8.04275L10.6402 5.23725C10.7731 5.10441 10.8478 4.9242 10.8479 4.73627C10.848 4.54834 10.7734 4.36808 10.6405 4.23514C10.5077 4.10221 10.3275 4.02749 10.1395 4.02742C9.95161 4.02735 9.77135 4.10195 9.63842 4.23479L6.56583 7.30737C6.04583 7.24077 5.32178 7.04807 4.52689 6.78594C3.93513 6.58877 3.34878 6.37568 2.7685 6.14691L2.76779 6.14762Z"
                    fill="black"
                  />
                </svg>
              </div>
              <input
                type="url"
                className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="github.com/john"
                required
              />
            </div>
          </div>

          <div className="flex-center">
            <button
              type="submit"
              className="text-white w-[500px] mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
