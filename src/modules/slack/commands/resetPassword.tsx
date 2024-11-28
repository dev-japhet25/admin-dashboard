import Popover from "@/components/Popover";
import { sendSlackCommand } from "@/lib/api";
import React, { useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import Button from "@/components/Button";
import ImageLoader from "@/components/Loader/Loader";
import { ResponseCard } from '@/components/ResponseCard';

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState("");

  const fields : {[key : string] : string} ={}

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  function onClick() {
    setOpen(false)
    setResponseMessage("")
  }
  const handleSubmit = async () => {
    setLoading(true)
    // Basic validation
    if (!email || !password) {
      setLoading(false)
      setIsError(true);
      setResponseMessage("Please enter both email and password.");
      return;
    }

    try {
      const commandText = `${email} ${password}`;
      const result = await sendSlackCommand("/reset_password", commandText);
      if (result.includes("No user with email")) {
        setIsError(true);
        setLoading(false)
        setResponseMessage(result);
      } else if (result.includes("Password reset successful")) {
        setIsError(false);
        setLoading(false)
        setResponseMessage(result);
      } else {
        setLoading(false)
        setIsError(true);
        setResponseMessage("An unexpected response was received.");
      }

      setOpen(true)
    } catch (error: any) {
      setIsError(true);
      setLoading(true)
      setResponseMessage("An error occurred while resetting the password.");
    }
  };

  console.log('password reset',responseMessage)

  const formatResponse = responseMessage.split("\n").slice(1);

  formatResponse.forEach((response,index)=> {
    let eachLine = response.replaceAll("*","").split(":").filter((val)=> index === 0 ?isNaN(Number(val)): val);
     let [key,value] = eachLine;
     if(key && value){
      fields[key.trim()] = value.trim()
     }
  })

   console.log('This ',fields)
  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Reset Password Command
          </h2>
          <div>
            <Popover title="Reset Password Command">
              <h3 className="font-semibold text-lg mb-2">
                /reset_password Command
              </h3>
              <p>
                <strong>Purpose:</strong> Resets the password for CRM admin
                users based on their email and a new password.
              </p>
              <p>
                <strong>Parameters:</strong>
                <ul>
                  <li>
                    <strong>Email:</strong> The user's email address.
                  </li>
                  <li>
                    <strong>Password:</strong> The new password to be set for
                    the user.
                  </li>
                </ul>
              </p>
              <p>
                <strong>Functionality:</strong> Allows administrators to reset
                the password for CRM admin users.
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
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter new password"
            />
          </div>
        </div>

        <div className="my-6 text-center">
          {/* <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Reset Password
          </button> */}

          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>
        {responseMessage && <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Reset Password">
          {responseMessage && (

            <div
              className={`my-4 p-4 border rounded-md text-lg text-center ${isError
                  ? "bg-white text-red-800 border-slate-300"
                  : "bg-white text-green-800 border-slate-300"
                }`}
            >
              <span className="font-semibold">
                {isError ? "Error:" : "Success:"}{" "}
              </span>
              {isError ? (
                <span>{responseMessage}</span>
              ) : (
                <><span>{responseMessage.split("\n").slice(0, 1)}</span></>
              )}
            </div>
           
          )}
            {!isError && (<ResponseCard entityKey={Object.keys(fields) || null} entityValue={Object.values(fields)} headerA='Title' headerB='Values' />)}
        </Modal>}
        {loading && (<ImageLoader />)}
      </div>
    </div>
  );
};

export default ResetPassword;
