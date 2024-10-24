import React, { useState } from "react";
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";

const FinanceReportCommand = () => {
  const [branchId, setBranchId] = useState("");
  const [duration, setDuration] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isGeneral, setIsGeneral] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<{ type: 'email' | 'report'; message?: string; url?: string } | null>(null);

  // Handle input changes
  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBranchId(e.target.value);
  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setDuration(e.target.value);
  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFromDate(e.target.value);
  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setToDate(e.target.value);
  const handleIsGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIsGeneral(e.target.checked);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      let commandText = " ";
      commandText += branchId
        ? `${branchId} ${duration}`
        : `all ${duration}`;
      if (isGeneral) {
        commandText += " export";
      }

      if (duration === "filter") {
        commandText += ` ${fromDate} ${toDate}`;
      }

      const result = await sendSlackCommand("/finance_report", commandText);
      console.log(result);
      if (result.includes("Emails sent")) {
        setResponse({ type: "email", message: "Emails sent" });
      } else if (result.includes("Please find report below")) {
        const reportUrl = result.split("\n")[1];
        setResponse({ type: "report", url: reportUrl });
      }else{
        setError(result)
      }
    } catch (err) {
      setError("An error occurred while fetching the finance report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Finance Report Command
          </h2>
        </div>

        <div className="space-y-4">
          {/* Branch ID Input */}
          <div>
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
              placeholder="Enter branch ID"
            />
          </div>

          {/* Duration Select */}
          <div>
            <label
              htmlFor="duration"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Duration
            </label>
            <select
              id="duration"
              value={duration}
              onChange={handleDurationChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="">Select Duration</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="filter">Custom Range</option>
            </select>
          </div>

          {/* Date Filters for Custom Range */}
          {duration === "filter" && (
            <>
              <div>
                <label
                  htmlFor="fromDate"
                  className="block mb-2 text-md font-medium text-gray-900"
                >
                  From Date
                </label>
                <input
                  type="date"
                  id="fromDate"
                  value={fromDate}
                  onChange={handleFromDateChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor="toDate"
                  className="block mb-2 text-md font-medium text-gray-900"
                >
                  To Date
                </label>
                <input
                  type="date"
                  id="toDate"
                  value={toDate}
                  onChange={handleToDateChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
            </>
          )}

          {/* Include General Report Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isGeneral"
              checked={isGeneral}
              onChange={handleIsGeneralChange}
              className="me-5 border border-gray-300 rounded-md text-gray-900"
            />
            <label
              htmlFor="isGeneral"
              className="block  text-md font-medium text-gray-900"
            >
              Include General Report (Export)
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="my-6 text-center">
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Error Message */}
        {!loading && error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && response && (
          <div className="my-6 p-4 border">
            {response.type === "email" && (
              <p className="text-green-600 font-bold text-center">
                {response.message}
              </p>
            )}
            {response.type === "report" && (
              <div className="text-center">
                <p className="text-gray-900 font-medium">
                  Please find the report below:
                </p>
                <a
                  href={response.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Download Report
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceReportCommand;
