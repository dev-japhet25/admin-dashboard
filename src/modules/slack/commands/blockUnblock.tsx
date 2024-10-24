import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const BlockUnblockCommand = () => {
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [action, setAction] = useState('');

  const handlePhoneNumbersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumbers(e.target.value);
  };

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the form submission for blocking or unblocking numbers
    console.log(`Action: ${action}`);
    console.log(`Phone Numbers: ${phoneNumbers}`);
    // Logic to process the command goes here
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Block/Unblock Numbers Command
          </h2>
          <div>
            <Popover title="Block/Unblock Command">
              <h3 className="font-semibold text-lg mb-2">/block & /unblock Commands</h3>
              <p><strong>Purpose:</strong> Allows administrators to block or unblock phone numbers.</p>
              <p><strong>Parameters:</strong> 
                <ul>
                  <li><strong>Phone Numbers:</strong> Comma-separated list of phone numbers to be blocked or unblocked.</li>
                  <li><strong>Action:</strong> Specify whether to "block" or "unblock" the numbers.</li>
                </ul>
              </p>
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
              <option value="block">Block</option>
              <option value="unblock">Unblock</option>
            </select>
          </div>

          {/* Phone Numbers Input */}
          <div>
            <label
              htmlFor="phoneNumbers"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Phone Numbers (comma-separated)
            </label>
            <input
              type="text"
              id="phoneNumbers"
              value={phoneNumbers}
              onChange={handlePhoneNumbersChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter phone numbers separated by commas"
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

export default BlockUnblockCommand;
