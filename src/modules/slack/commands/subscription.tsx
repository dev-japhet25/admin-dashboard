import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const SubscriptionCommand = () => {
  const [branchId, setBranchId] = useState('');

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Subscription Command
          </h2>
          <div>
            <Popover title="Subscription Command">
              <h3 className="font-semibold text-lg mb-2">/subscription Command</h3>
              <p><strong>Purpose:</strong> Checks the subscription status for a specific branch or church.</p>
              <p><strong>Parameters:</strong> Branch ID (optional). If Branch ID is provided, retrieves subscription details for that branch; otherwise, retrieves details for the entire church.</p>
              <p><strong>Functionality:</strong> Displays current subscription details including whether the subscription is on a free tier, trial phase, expiry date, and subscription history if available.</p>
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
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCommand;
