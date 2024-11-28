import { useState } from "react";
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";
import { Modal } from "@/components/Modal/Modal";
import toast from "react-hot-toast";
import ImageLoader from "@/components/Loader/Loader";

const BranchesCommand = () => {
  const [churchId, setChurchId] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleChurchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChurchId(e.target.value);
  };

  function onClick() {
    setOpen(false)
    setResponse("")
  }
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand("/branches", churchId);
      setResponse(response);
      setLoading(false)
      if (!response.includes(":")) {
        let message = response.split("*")[0]
        toast.error(message);
        return;
      }
      setOpen(true)
    } catch (error: any) {
      setLoading(false)
      setResponse("An error occurred while fetching data.");
    }
  };

  const parseResponse = (response: string) => {
    const lines = response.split("\n");
    const churchName = lines[0]?.split(":")[1]?.trim() || "N/A";
    const branchLines = lines.slice(3).filter(line => line.trim() !== "");

    return {
      churchName,
      branches: branchLines.map(line => {
        const parts = line.split("*").map(part => part.trim()).filter(part => part);
        if (parts.length < 3) return { id: "N/A", name: "N/A", ussdCode: "None" };

        const nameParts = parts.slice(1, -1);
        const name = nameParts.join(" ").replace("Name:", "").trim().replace("USSD Code:", "");
        const ussdCode = parts[parts.length - 1].replace("USSD Code:", "").trim() || "None";

        return {
          name,
          ussdCode
        };
      })
    };
  };

  const { churchName, branches } = response ? parseResponse(response) : { churchName: "N/A", branches: [] };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Branches Command
          </h2>
          <div>
            <Popover title="Branches Command">
              <h3 className="font-semibold text-lg mb-2">/branches Command</h3>
              <p>
                <strong>Purpose:</strong> Lists all active branches for a specific church and optionally provides additional details such as last login information.
              </p>
              <p>
                <strong>Parameters:</strong>
                <ul>
                  <li>Church Id</li>
                </ul>
              </p>
              <p>
                <strong>Functionality:</strong> Retrieves and displays all branches with details like ID, name, USSD code, and optionally includes last login information for admins. Also provides a URL for downloading the branch list if the export option is included.
              </p>
            </Popover>
          </div>
        </div>
        <div className="space-y-4">
          <div className="my-4">
            <label
              htmlFor="churchId"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Church ID
            </label>
            <input
              type="text"
              id="churchId"
              value={churchId}
              onChange={handleChurchIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter Church ID"
            />
            <div className="my-6 text-center">
              <Button handleSubmit={handleSubmit} loading={loading} />
            </div>
            {Object.values(branches).length > 0 && <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="List Of Branches">
              {response && (

                <div className="mt-6 rounded-md border bg-gray-50 shadow-lg max-h-96 overflow-auto">
                  {/* Header Section */}
                  <div className="mb-4">
                    <p className="text-lg font-bold text-gray-700 text-center">
                      Church - {" "}
                      <span className="text-blue-600">{churchName.replace("*", "")}</span>
                    </p>
                  </div>

                  {/* Branches Section */}
                  {/* <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
                  List of Branches
                </h3> */}

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            USSD Code
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {branches.map((branch, index) => (
                          <tr key={index} className="hover:bg-gray-100">
                            <td className=" py-4 whitespace-nowrap text-sm text-gray-500">
                              {branch.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {branch.ussdCode !== "None" ? (
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  {branch.ussdCode}
                                </span>
                              ) : (
                                "None"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Modal>}
            {loading && (<ImageLoader />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchesCommand;
