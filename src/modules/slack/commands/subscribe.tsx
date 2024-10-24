import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const SubscribeCommand = () => {
  const [churchId, setChurchId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [durationMonths, setDurationMonths] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [churchSize, setChurchSize] = useState('');

  const handleChurchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChurchId(e.target.value);
  };

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const handleDurationMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDurationMonths(e.target.value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleChurchSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChurchSize(e.target.value);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Subscribe Command
          </h2>
          <div>
            <Popover title="Subscribe Command">
              <h3 className="font-semibold text-lg mb-2">/subscribe Command</h3>
              <p><strong>Purpose:</strong> Used to create or update a SaaS subscription for a church or branch.</p>
              <p><strong>Parameters:</strong> Church ID, Branch ID, Duration (months), Currency, Amount, Church Size.</p>
              <p><strong>Functionality:</strong> Manages the subscription including the amount and duration based on church size and ensures the subscription details are correct.</p>
            </Popover>
          </div>
        </div>
        <div className="space-y-4">
          <div className="my-4">
            <label
              htmlFor="churchId"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Church ID
            </label>
            <input
              type="text"
              id="churchId"
              value={churchId}
              onChange={handleChurchIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter Church ID"
            />
          </div>
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
          <div className="my-4">
            <label
              htmlFor="durationMonths"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Duration (Months)
            </label>
            <input
              type="number"
              id="durationMonths"
              value={durationMonths}
              onChange={handleDurationMonthsChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter duration in months"
            />
          </div>
          <div className="my-4">
            <label
              htmlFor="currency"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Currency
            </label>
            <input
              type="text"
              id="currency"
              value={currency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter currency"
            />
          </div>
          <div className="my-4">
            <label
              htmlFor="amount"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Amount
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter amount"
            />
          </div>
          <div className="my-4">
            <label
              htmlFor="churchSize"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Church Size
            </label>
            <input
              type="text"
              id="churchSize"
              value={churchSize}
              onChange={handleChurchSizeChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter church size"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeCommand;
