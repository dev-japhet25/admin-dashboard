import { useState } from "react";
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";

const BalanceCommand = () => {
  const [branchId, setBranchId] = useState("");
  const [creditType, setCreditType] = useState("");

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const handleCreditTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditType(e.target.value);
  };

  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await sendSlackCommand(
        "/balance",
        `${branchId} ${creditType}`
      );
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
            Balance Command
          </h2>
          <div>
            <Popover title="Balance Command">
              <h3 className="font-semibold text-lg mb-2">/balance Command</h3>
              <p>
                <strong>Purpose:</strong> Retrieves and displays the SMS balance
                details for a specific branch or church.
              </p>
              <p>
                <strong>Parameters:</strong> Branch ID (optional) and Credit
                Type (optional). If Branch ID is provided, fetches data specific
                to that branch; otherwise, data is for the entire church. Credit
                Type specifies the type of SMS balance to retrieve.
              </p>
              <p>
                <strong>Functionality:</strong> Shows detailed SMS balance
                information, including formatted date fields.
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
          </div>
          <div className="my-4">
            <label
              htmlFor="creditType"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Credit Type
            </label>
            <input
              type="text"
              id="creditType"
              value={creditType}
              onChange={handleCreditTypeChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter Credit Type"
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
                  <p className="text-lg font-bold text-gray-700 text-center">
                    Church:{" "}
                    {response
                      .split("\n")[1]
                      .replace(/(\*|)/g, "")
                      .replace("Church:", "")}
                  </p>
                  <p className="text-lg font-bold text-gray-700 text-center">
                    Branch:{" "}
                    {response
                      .split("\n")[2]
                      .replace(/(\*|)/g, "")
                      .replace("Branch:", "")}
                  </p>
                </div>

                {/* SMS Details Section */}
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
                  SMS DETAILS
                </h3>

                <div className="space-y-4">
                  {[4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
                    <div
                      key={index}
                      className="flex justify-evenly items-center p-4 text-green-500 rounded-lg shadow-sm"
                    >
                      <p>
                        {
                          response
                            .split("\n")
                            [index].replace(/(\*|)/g, "")
                            .split(":")[0]
                        }
                      </p>
                      <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ">
                        {
                          response
                            .split("\n")
                            [index].replace(/(\*|)/g, "")
                            .split(":")[1]
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCommand;
