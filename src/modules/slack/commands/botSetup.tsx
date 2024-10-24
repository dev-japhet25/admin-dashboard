import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
const BotSetup = () => {
  const [action, setAction] = useState('');
  const [branchId, setBranchId] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [branchIds, setBranchIds] = useState('');

  const handleActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAction(e.target.value);
  };

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  const handleUniqueIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUniqueId(e.target.value);
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
  };

  const handleBranchIdsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchIds(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the form submission for different bot setup actions
    console.log(`Action: ${action}`);
    console.log(`Branch ID: ${branchId}`);
    console.log(`Expiry Date: ${expiryDate}`);
    console.log(`Unique ID: ${uniqueId}`);
    console.log(`Date From: ${dateFrom}`);
    console.log(`Date To: ${dateTo}`);
    console.log(`Branch IDs: ${branchIds}`);
    // Logic to process the command goes here
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Bot Setup
          </h2>
          <div>
            <Popover title="Bot Setup">
              <h3 className="font-semibold text-lg mb-2">/botsetup Command</h3>
              <p><strong>Purpose:</strong> Configures bot setups for branches, including setting up, updating, fetching, and managing expiry dates.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li><strong>Action:</strong> The action to perform (setup, update, expiry, fetch).</li>
                  <li><strong>Branch ID:</strong> The ID of the branch.</li>
                  <li><strong>Expiry Date:</strong> The expiry date (format DD-MM-YYYY).</li>
                  <li><strong>Unique ID:</strong> A unique identifier for the setup.</li>
                  <li><strong>Date From:</strong> Start date for fetching records (format DD-MM-YYYY).</li>
                  <li><strong>Date To:</strong> End date for fetching records (format DD-MM-YYYY).</li>
                  <li><strong>Branch IDs:</strong> Comma-separated branch IDs for including or excluding records.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong> Handles various actions such as setting up, updating, and fetching bot setups for branches.</p>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          {/* Action Input */}
          <div>
            <label
              htmlFor="action"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Action
            </label>
            <input
              type="text"
              id="action"
              value={action}
              onChange={handleActionChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter action (setup, update, expiry, fetch)"
            />
          </div>

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

          {/* Expiry Date Input */}
          <div>
            <label
              htmlFor="expiryDate"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter expiry date (DD-MM-YYYY)"
            />
          </div>

          {/* Unique ID Input */}
          <div>
            <label
              htmlFor="uniqueId"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Unique ID
            </label>
            <input
              type="text"
              id="uniqueId"
              value={uniqueId}
              onChange={handleUniqueIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter unique ID"
            />
          </div>

          {/* Date From Input */}
          <div>
            <label
              htmlFor="dateFrom"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Date From
            </label>
            <input
              type="text"
              id="dateFrom"
              value={dateFrom}
              onChange={handleDateFromChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter start date (DD-MM-YYYY)"
            />
          </div>

          {/* Date To Input */}
          <div>
            <label
              htmlFor="dateTo"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Date To
            </label>
            <input
              type="text"
              id="dateTo"
              value={dateTo}
              onChange={handleDateToChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter end date (DD-MM-YYYY)"
            />
          </div>

          {/* Branch IDs Input */}
          <div>
            <label
              htmlFor="branchIds"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Branch IDs
            </label>
            <input
              type="text"
              id="branchIds"
              value={branchIds}
              onChange={handleBranchIdsChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter branch IDs (comma-separated)"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="my-6 text-center">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Submit Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotSetup;
