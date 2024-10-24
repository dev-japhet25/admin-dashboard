import { useState } from 'react';
import Popover from '@/components/Popover';

const AccountCategoriesCommand = () => {
  const [branchId, setBranchId] = useState('');

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Account Categories Command
          </h2>
          <div>
            <Popover title="Account Categories Command">
              <h3 className="font-semibold text-lg mb-2">/account_categories Command</h3>
              <p><strong>Purpose:</strong> Retrieves finance account categories for a specific branch.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li><strong>Branch ID:</strong> The ID of the branch to retrieve account categories for.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong>
                <ul>
                  <li>Searches for the branch based on the provided ID.</li>
                  <li>Retrieves finance account categories for the branch, including the default ones.</li>
                  <li>Displays the number of categories found and formats the result with details of each category.</li>
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

export default AccountCategoriesCommand;
