import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const SetupPaymentCommand = () => {
  const [command, setCommand] = useState('/setup_branch_payment');
  const [id, setId] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const handleCommandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCommand(e.target.value);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePubKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPubKey(e.target.value);
  };

  const handleIsUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUpdate(e.target.checked);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Setup Payment Command
          </h2>
          <div>
            <Popover title="Setup Payment Command">
              <h3 className="font-semibold text-lg mb-2">/setup_branch_payment & /setup_church_payment Command</h3>
              <p><strong>Purpose:</strong> Sets up or updates payment gateway credentials for either a branch or a church.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li><strong>ID:</strong> Branch or Church ID</li>
                  <li><strong>Pub Key:</strong> Public key for the payment gateway.</li>
                  <li><strong>Command:</strong> Either '/setup_branch_payment' or '/setup_church_payment'.</li>
                  <li><strong>Update:</strong> If 'update' is included, it updates the existing credential instead of creating a new one.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong>
                <ul>
                  <li>Searches for the corresponding branch or church based on the provided ID.</li>
                  <li>Sets up the AsoribaPay payment gateway for the branch or church.</li>
                  <li>If 'update' is included, the existing credentials will be updated.</li>
                  <li>Displays the branch or church name, public key, and creation date of the credentials.</li>
                </ul>
              </p>
            </Popover>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="command"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Command
            </label>
            <select
              id="command"
              value={command}
              onChange={handleCommandChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="/setup_branch_payment">/setup_branch_payment</option>
              <option value="/setup_church_payment">/setup_church_payment</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Branch/Church ID
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={handleIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter Branch or Church ID"
            />
          </div>
          <div>
            <label
              htmlFor="pubKey"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Public Key
            </label>
            <input
              type="text"
              id="pubKey"
              value={pubKey}
              onChange={handlePubKeyChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter Public Key"
            />
          </div>
          <div>
            <label
              htmlFor="isUpdate"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Update Existing Credentials
            </label>
            <input
              type="checkbox"
              id="isUpdate"
              checked={isUpdate}
              onChange={handleIsUpdateChange}
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPaymentCommand;
