import { useState } from "react";
import Popover from "@/components/Popover";
import Button from "@/components/Button";
import { sendSlackCommand } from "@/lib/api";
import { Modal } from "@/components/Modal/Modal";
import ImageLoader from "@/components/Loader/Loader";

const AllMembersCommand = () => {
  const [branchId, setBranchId] = useState("");
  const [condition, setCondition] = useState("");
  const [recordType, setRecordType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [response, setResponse] = useState("");
  const [open,setOpen] = useState(true)
  const [loading,setLoading] =useState(false)

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition(e.target.value);
  };

  const handleRecordTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecordType(e.target.value);
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };


  function onClick() {
    setOpen(false)
    setResponse("")
} 


  const handleSubmit = async () => {
    setLoading(true)
    let commandText = `${branchId} ${condition} ${recordType}`;

    if (fromDate) {
      commandText += ` ${fromDate}`;
    }
    if (toDate) {
      commandText += ` ${toDate}`;
    }

    try {
      const result = await sendSlackCommand("/all_members", commandText);
      setOpen(true)
      setLoading(false)
      setResponse(result);
    } catch (error: any) {
      setLoading(false)
      setResponse("An error occurred while fetching data.");
    }
  };

  const parseResponse = (response: string) => {
    const lines = response.split("\n").filter((line) => line.trim() !== "");
    const messageLine = lines[0];
    const downloadLinkLine = lines.find((line) =>
      line.includes("downloadable link")
    );

    return {
      message:
        messageLine?.split("downloadable")[0]?.trim() || "No record found",
      downloadLink: downloadLinkLine?.split("link")[1]?.trim() || null,
    };
  };

  const { message, downloadLink } = response
    ? parseResponse(response)
    : { message: "No record found", downloadLink: null };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            All Members Command
          </h2>
          <div>
            <Popover title="All Members Command">
              <h3 className="font-semibold text-lg mb-2">
                /all_members Command
              </h3>
              <p>
                <strong>Purpose:</strong> Retrieve and filter members based on
                specific conditions.
              </p>
              <p>
                <strong>Parameters:</strong>
                <ul>
                  <li>
                    <strong>branch_id:</strong> ID of the branch (required).
                  </li>
                  <li>
                    <strong>condition:</strong> 'with' or 'without' records of a
                    certain type.
                  </li>
                  <li>
                    <strong>record_type:</strong> Type of record: 'pledge',
                    'income', or other member records.
                  </li>
                  <li>
                    <strong>from_date (optional):</strong> Start date for
                    filtering records (optional).
                  </li>
                  <li>
                    <strong>to_date (optional):</strong> End date for filtering
                    records (optional).
                  </li>
                </ul>
              </p>
              <p>
                <strong>Functionality:</strong>
                <ul>
                  <li>
                    Filters members based on the record type (pledge, income,
                    etc.) and date range.
                  </li>
                  <li>Generates downloadable reports for members.</li>
                  <li>
                    Handles both inclusion (`with`) and exclusion (`without`) of
                    specific records.
                  </li>
                </ul>
              </p>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          {/* Branch ID Input */}
          <div>
            <label
              htmlFor="branchIdInput"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Branch ID
            </label>
            <input
              type="text"
              id="branchIdInput"
              value={branchId}
              onChange={handleBranchIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter branch ID"
            />
          </div>

          {/* Condition Select */}
          <div>
            <label
              htmlFor="conditionSelect"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Condition
            </label>
            <select
              id="conditionSelect"
              value={condition}
              onChange={handleConditionChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="">Select condition</option>
              <option value="with">With Records</option>
              <option value="without">Without Records</option>
            </select>
          </div>

          {/* Record Type Select */}
          <div>
            <label
              htmlFor="recordTypeSelect"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Record Type
            </label>
            <select
              id="recordTypeSelect"
              value={recordType}
              onChange={handleRecordTypeChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="">Select record type</option>
              <option value="pledge">Pledge</option>
              <option value="income">Income</option>
              <option value="data">Data</option>
              {/* Add more record types as needed */}
            </select>
          </div>

          {/* From Date Input */}
          <div>
            <label
              htmlFor="fromDateInput"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              From Date (Optional)
            </label>
            <input
              type="date"
              id="fromDateInput"
              value={fromDate}
              onChange={handleFromDateChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="toDateInput"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              To Date (Optional)
            </label>
            <input
              type="date"
              id="toDateInput"
              value={toDate}
              onChange={handleToDateChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>
        </div>

        <div>
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>
       {response && <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="All Members">
        {response && (
          <div className="mt-2 p-6 rounded-md border bg-gray-50 shadow-lg">
            <p className="text-lg font-normal text-gray-700 text-center">
              {message}
            </p>
            {downloadLink && (
              <div className="my-4 text-center">
                <a
                  href={downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Download XLSX
                </a>
              </div>
            )}
          </div>
        )}
        </Modal>}
        {loading &&  (<ImageLoader/>)}
      </div>
    </div>
  );
};

export default AllMembersCommand;
