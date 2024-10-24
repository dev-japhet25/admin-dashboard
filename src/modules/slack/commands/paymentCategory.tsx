import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const PaymentCategorySetup = () => {
  const [branchId, setBranchId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [pubKey, setPubKey] = useState('');

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const handleCategoryIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryId(e.target.value);
  };

  const handlePubKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPubKey(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the form submission for setting up the payment category
    console.log(`Branch ID: ${branchId}`);
    console.log(`Category ID: ${categoryId}`);
    console.log(`Public Key: ${pubKey}`);
    // Logic to process the command goes here
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Payment Category Setup
          </h2>
          <div>
            <Popover title="Payment Category Setup">
              <h3 className="font-semibold text-lg mb-2">/payment_category_setup Command</h3>
              <p><strong>Purpose:</strong> Sets up a payment category for a branch with the given public key.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li><strong>Branch ID:</strong> The ID of the branch.</li>
                  <li><strong>Category ID:</strong> The ID of the payment category.</li>
                  <li><strong>Public Key:</strong> The public key to be used for payment setup.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong> Configures the payment category for the specified branch with the provided public key.</p>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
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

          {/* Category ID Input */}
          <div>
            <label
              htmlFor="categoryId"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Category ID
            </label>
            <input
              type="text"
              id="categoryId"
              value={categoryId}
              onChange={handleCategoryIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter category ID"
            />
          </div>

          {/* Public Key Input */}
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
              placeholder="Enter public key"
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

export default PaymentCategorySetup;
