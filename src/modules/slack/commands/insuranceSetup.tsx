import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const InsuranceSetupCommand = () => {
  const [action, setAction] = useState('');
  const [branchIds, setBranchIds] = useState('');

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value);
  };

  const handleBranchIdsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchIds(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the form submission for activating or deactivating insurance
    console.log(`Action: ${action}`);
    console.log(`Branch IDs: ${branchIds}`);
    // Logic to process the command goes here
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Insurance Setup Command
          </h2>
          <div>
            <Popover title="Insurance Setup Command">
              <h3 className="font-semibold text-lg mb-2">/insurance_setup Command</h3>
              <p><strong>Purpose:</strong> Used to activate or deactivate insurance subscriptions for branches.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li><strong>Action:</strong> "activate" or "deactivate".</li>
                  <li><strong>Branch IDs:</strong> Comma-separated list of branch IDs.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong> Allows administrators to manage insurance subscriptions for ICGC and other branches.</p>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          {/* Action Select */}
          <div>
            <label
              htmlFor="actionSelect"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Action
            </label>
            <select
              id="actionSelect"
              value={action}
              onChange={handleActionChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="">Select Action</option>
              <option value="activate">Activate</option>
              <option value="deactivate">Deactivate</option>
            </select>
          </div>

          {/* Branch IDs Input */}
          <div>
            <label
              htmlFor="branchIds"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Branch IDs (comma-separated)
            </label>
            <input
              type="text"
              id="branchIds"
              value={branchIds}
              onChange={handleBranchIdsChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter branch IDs separated by commas"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="my-6 text-center">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Submit Command
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSetupCommand;
