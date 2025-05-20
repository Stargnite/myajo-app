import { useState } from "react";
import {ArrowLeft} from "lucide-react"
// import { EyeIcon, EyeOffIcon } from "lucide-react";
// import headerImg from "@/assets/myajoImg.jpg"

export default function EditBankDetails() {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Submitted group info", { accountName});
  };

  return (
    <div className="flex min-h-screen w-screen md:w-[50vw] rounded-0 md:rounded-lg md:min-h-full md:shadow-lg md:my-[2rem] bg-white rounded-0 flex-col items-center text-start justify-center p-4">
      {/* <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm"> */}
      <div className="md:px-5 space-y-10 px-3 w-full">
        <div className="flex flex-col items-start space-y-8">
            <div className="flex items-center w-full">
            <div><ArrowLeft /></ div>
          <h1 className="text-2xl font-semibold text-gray-900 text-center md:text-start w-full">
          Edit bank details
          </h1>
            </div>
          <p className="text-gray-800">Update your bank Info for future Payouts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="accountName"
              className="block text-sm font-semibold text-gray-900"
            >
             Account Name
            </label>
            <input
              id="accountName"
              type="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Input/Paste referral Code"
              required
              className="w-full rounded-lg border-0 bg-[#f0d9b5] p-3 text-gray-900 placeholder-gray-500 focus:border-[#8B5A2B] focus:outline-none"
            />
          </div>


          <div className="space-y-2">
            <label
              htmlFor="accountNumber"
              className="block text-sm font-semibold text-gray-900"
            >
              Bank Account Number
            </label>
            <input
              id="accountNumber"
              type="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter the amount to contribute"
              required
              className="w-full rounded-lg border-0 bg-[#f0d9b5] p-3 text-gray-900 placeholder-gray-500 focus:border-[#8B5A2B] focus:outline-none"
            />
          </div>



          <div className="space-y-2">
            <label
              htmlFor="bankName"
              className="block text-sm font-medium text-gray-900"
            >
              Bank Name
            </label>
            <div className="relative">
              <input
                id="bankName"
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Select Bank Name"
                required
                className="w-full rounded-lg border-0 bg-[#f0d9b5] p-3 text-gray-900 placeholder-gray-500 focus:border-[#8B5A2B] focus:outline-none"
              />
            </div>
          </div>


          <button
            type="submit"
            className="mt-16 w-full rounded-md bg-[#5D3A00] p-3 text-center font-medium text-white hover:bg-[#7a4f26] focus:outline-none"
          >
           Save
          </button>

          
          <div className="py-2">
            <p className="text-black">Note: Changes will apply to your next payout</p>
          </div>
        </form>
      </div>
    </div>
  );
}
