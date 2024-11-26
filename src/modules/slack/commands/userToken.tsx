import React, { useState } from "react";
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";
import { Modal } from "@/components/Modal/Modal";
import toast from "react-hot-toast";
import ImageLoader from "@/components/Loader/Loader";

const UserToken = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [response, setResponse] = useState<string | null>(null);
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand("/user_token", email);
      setOpen(true)
      setLoading(false)
      if (response.includes("No user with email")) {
        toast.error(response.replaceAll("*", ""))
        return;
      }
      if(!response.startsWith("*")){
        toast.error(response)
        return;
      }
      setResponse(response);
    } catch (error: any) {
      setResponse(error.message);
      setLoading(false)
    }
  };


  function onClick() {
    setOpen(false)
    setResponse("")
  }


  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            User Token Command
          </h2>
          <div>
            <Popover title="User Token Command">
              <h3 className="font-semibold text-lg mb-2">
                /user_token Command
              </h3>
              <p>
                <strong>Purpose:</strong> Generates a token for CRM admin users
                based on their email.
              </p>
              <p>
                <strong>Parameters:</strong> Email (the user's email address).
              </p>
              <p>
                <strong>Functionality:</strong> Allows administrators to
                retrieve a token for a CRM admin user based on their email.
              </p>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              User Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter user email"
            />
          </div>
        </div>

        <div className="my-6 text-center">
          {/* <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Command
          </button> */}



          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>

        {response &&
         <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="User Token">
          {response && (
            <div className="mt-1 p-4 rounded-md border bg-gray-50 shadow-lg max-h-96 overflow-auto">
              {/* Dynamically Extract User and Email Token */}
              <div className="mb-1">
                <p className="text-blue-500 capitalize text-center font-normal text-xl">
                  {/* User  
                  {" "} */}
                  {response
                    ?.split("\n")[0].split(" ").slice(2).join(" ")
                    ?.replace(/(\*|)/g, "")
                    ?.replace("User:", "")}
                </p>
              </div>

              {/* Email Token Section */}
              {/* <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
              Email Token
            </h3> */}

              <div className="">
                <div className="flex justify-evenly items-center text-blue-500 rounded-lg shadow-sm">
                  <p>
                    {response?.split("\n")[1]?.replace(/(\*|)/g, "")?.split(":")[0]}
                  </p>
                  <span className="bg-blue-100 text-blue-800 text-sm font-bold me-2 mx-5 px-0.5 py-0.5 rounded">
                    {response?.split("\n")[1]?.replace(/(\*|)/g, "")?.split(":")[1]}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal>}
        {loading && (<ImageLoader />)}
      </div>
    </div>
  );
};

export default UserToken;
