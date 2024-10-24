import React, { useState } from "react";
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";

const UserToken = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [response, setResponse] = useState<string | null>(null);
  const handleSubmit = async () => {
    try {
      const response = await sendSlackCommand("/user_token", email);
      setResponse(response);
    } catch (error: any) {
      setResponse(error.message);
    }
  };

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
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Command
          </button>
        </div>

        {response && (
          <div className="mt-6 p-6 rounded-md border bg-gray-50 shadow-lg">
            {/* Dynamically Extract User and Email Token */}
            <div className="mb-4">
              <p className="text-lg font-bold text-gray-700 text-center">
                User:{" "}
                {response
                  .split("\n")[0]
                  .replace(/(\*|)/g, "")
                  .replace("User:", "")}
              </p>
            </div>

            {/* Email Token Section */}
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
              Email Token
            </h3>

            <div className="space-y-4">
              <div className="flex justify-evenly items-center p-4 text-blue-500 rounded-lg shadow-sm">
                <p>
                  {response.split("\n")[1].replace(/(\*|)/g, "").split(":")[0]}
                </p>
                <span className="bg-blue-100 text-blue-800 text-sm font-bold me-2 px-2.5 py-0.5 rounded">
                  {response.split("\n")[1].replace(/(\*|)/g, "").split(":")[1]}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserToken;
