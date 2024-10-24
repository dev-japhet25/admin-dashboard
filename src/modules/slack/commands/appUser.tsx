import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const AppUserCommand = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            App User Command
          </h2>
          <div>
            <Popover title="App User Command">
              <h3 className="font-semibold text-lg mb-2">/app_user Command</h3>
              <p><strong>Purpose:</strong> Retrieves details of mobile app users based on email, phone number, or user ID.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li>Search Text: Can be an email address, phone number (starting with +), or user ID.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong>
                <ul>
                  <li>Searches for active users in the mobile app.</li>
                  <li>Displays user details including ID, name, email, phone number, and various settings.</li>
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
              placeholder="Enter email, phone number, or user ID"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppUserCommand;
