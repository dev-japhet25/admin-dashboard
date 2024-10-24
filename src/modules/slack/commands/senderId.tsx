import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const SenderId = () => {
  const [activationStatus, setActivationStatus] = useState('');
  const [senderId, setSenderId] = useState('');

  const handleActivationStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivationStatus(e.target.value);
  };

  const handleSenderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderId(e.target.value);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">

        <div className='flex justify-between my-6 '>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Sender ID Command
          </h2>
          <div>
            <Popover title="Sender Id ">
              <h3 className="font-semibold text-lg mb-2">/sender_id Command</h3>
              <p><strong>Purpose:</strong> Used to activate, deactivate, check the status, or set the sender ID for a church's SMS service.</p>
              <p><strong>Parameters:</strong> Activation Status (action: activate, deactivate, status, use, all) and Sender ID (unique identifier for SMS).</p>
              <p><strong>Functionality:</strong> Allows administrators to manage the sender ID for a branch or church's SMS services.</p>
            </Popover>
          </div>
        </div>
        <div className="space-y-4">
          <div className="my-10">
            <label
              htmlFor="select"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Activation Status
            </label>
            <select
              id="select"
              value={activationStatus}
              onChange={handleActivationStatusChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="">Select Activation Status</option>
              <option value="activate">Activate</option>
              <option value="deactivate">Deactivate</option>
              <option value="status">Status</option>
              <option value="all">All</option>
              <option value="use">Use</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="senderId"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Sender ID
            </label>
            <input
              type="text"
              id="senderId"
              value={senderId}
              onChange={handleSenderIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter sender ID"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderId;
