import { useState } from "react";
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import axios from "axios";
import { sendSlackCommand } from "@/lib/api";

const MemberTypesCommand = () => {
  const [branchId, setBranchId] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await sendSlackCommand("/member_types", branchId);
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
            Member Types Command
          </h2>
          <div>
            <Popover title="Member Types Command">
              <h3 className="font-semibold text-lg mb-2">
                /member_types Command
              </h3>
              <p>
                <strong>Purpose:</strong> Retrieves and displays the types of
                members in a specific church or branch. Shows the count of
                active and archived members for each type.
              </p>
              <p>
                <strong>Parameters:</strong>
                <ul>
                  <li>
                    Branch ID (optional): If provided, the command returns
                    member types for the specified branch. Otherwise, it returns
                    member types for the entire church.
                  </li>
                </ul>
              </p>
              <p>
                <strong>Functionality:</strong>
                <ul>
                  <li>
                    Fetches the branch if a Branch ID is provided. Otherwise, it
                    defaults to the church level.
                  </li>
                  <li>
                    Retrieves custom member types that are active and shown on
                    the web, excluding non-member types.
                  </li>
                  <li>
                    Counts and displays the number of active and archived
                    members for each member type.
                  </li>
                </ul>
              </p>
            </Popover>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="branchId"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Branch ID (Optional)
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
              <div className="mt-6 p-4 rounded-md border bg-white shadow-md">
                {/* <h3 className="text-xl text-gray-900 text-center font-semibold">Response</h3> */}

                <div className="mt-4 space-y-4">
                  {/* Extract Church Name */}
                  <p className="text-lg font-semibold text-gray-800">
                    <span className="font-bold">Church:</span>{" "}
                    {response.split("\n")[0].replace("*Church:* ", "")}
                  </p>

                  {/* Member Types Section */}
                  <h3 className="text-lg font-bold text-center text-gray-900">
                    MEMBER TYPES
                  </h3>

                  {/* List of member types */}
                  <ul className="space-y-2">
                    {response.split("\n").map((line, index) => {
                      if (line.includes("-")) {
                        const [type, count] = line.split(" - ");
                        return (
                          <li
                            key={index}
                            className="flex justify-between items-center border-b p-5"
                          >
                            <span className="text-lg font-medium text-gray-700">
                              {type}
                            </span>
                            <span
                              style={{
                                backgroundColor:
                                  count === "0" ? "#ffc5c5" : "#cce5cc",
                                color: count === "0" ? "#ff3737" : "#34c759",
                                fontSize: "0.75rem",
                                fontWeight: "500",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "0.25rem",
                              }}
                            >
                              {" "}
                              {count}
                            </span>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberTypesCommand;
