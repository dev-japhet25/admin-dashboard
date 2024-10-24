import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const UssdBranchesCommand = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            USSD Branches Command
          </h2>
          <div>
            <Popover title="USSD Branches Command">
              <h3 className="font-semibold text-lg mb-2">/ussd_branches Command</h3>
              <p><strong>Purpose:</strong> Retrieves USSD codes for church branches based on USSD ID or 'all'.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li>Search Text: Can be a specific USSD ID or the keyword 'all'.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong>
                <ul>
                  <li>Searches for active church branches with a USSD code.</li>
                  <li>Allows exporting results to a CSV file if 'export' is included in the search text.</li>
                  <li>Displays branch details including branch name and USSD code.</li>
                </ul>
              </p>
            </Popover>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="searchText"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Search Text
            </label>
            <input
              type="text"
              id="searchText"
              value={searchText}
              onChange={handleSearchTextChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter USSD ID or 'all'"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UssdBranchesCommand;
