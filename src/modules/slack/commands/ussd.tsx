import { useState } from "react";
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";

const UssdCommand = () => {
  const [branchId, setBranchId] = useState("");

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await sendSlackCommand("/ussd", branchId);
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
            USSD Command
          </h2>
          <div>
            <Popover title="USSD Command">
              <h3 className="font-semibold text-lg mb-2">/ussd Command</h3>
              <p>
                <strong>Purpose:</strong> Retrieves and displays various
                USSD-related activities and statistics for a specific branch or
                church.
              </p>
              <p>
                <strong>Parameters:</strong> Branch ID (optional). If provided,
                fetches data specific to that branch; otherwise, data is for the
                entire church.
              </p>
              <p>
                <strong>Functionality:</strong> Shows check-in sessions, member
                additions, and donation information based on USSD activities.
              </p>
            </Popover>
          </div>
        </div>
        <div className="space-y-4">
          <div className="my-4">
            <label
              htmlFor="branchId"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Branch ID
            </label>
            <input
              type="text"
              id="branchId"
              value={branchId}
              onChange={handleBranchIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter Branch ID"
            />
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
                {/* Dynamically Extract Church and Branch */}
                <div className="mb-4">
                  <p className="text-lg font-bold  text-gray-700 text-center">
                    Branch:{" "}
                    {response
                      .split("\n")[2]
                      .replace(/(\*|)/g, "")
                      .replace("Church:", "")}
                  </p>
                </div>

                {/* USSD Activities Section */}
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
                  {response.split("\n")[4].replace(/(\*|)/g, "")}
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-evenly items-center p-4 text-green-500 rounded-lg shadow-sm">
                    <p>
                      {
                        response
                          .split("\n")[6]
                          .replace(/(\*|)/g, "")
                          .split(":")[0]
                      }
                    </p>
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                      {
                        response
                          .split("\n")[6]
                          .replace(/(\*|)/g, "")
                          .split(":")[1]
                      }
                    </span>
                  </div>

                  <div className="flex justify-evenly items-center p-4 text-green-500 rounded-lg shadow-sm">
                    <p>
                      {
                        response
                          .split("\n")[7]
                          .replace(/(\*|)/g, "")
                          .split(":")[0]
                      }
                    </p>
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                      {
                        response
                          .split("\n")[7]
                          .replace(/(\*|)/g, "")
                          .split(":")[1]
                      }
                    </span>{" "}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UssdCommand;
