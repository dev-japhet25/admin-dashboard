import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
const CategoryPaymentSetupCommand = () => {
  const [branchId, setBranchId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [paymentCode, setPaymentCode] = useState('');

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const handleCategoryIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryId(e.target.value);
  };

  const handlePaymentCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentCode(e.target.value);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Category Payment Setup Command
          </h2>
          <div>
            <Popover title="Category Payment Setup Command">
              <h3 className="font-semibold text-lg mb-2">/category_payment_setup Command</h3>
              <p><strong>Purpose:</strong> Set up a payment code for a specific finance account category within a branch.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li><strong>Branch ID:</strong> The ID of the branch.</li>
                  <li><strong>Category ID:</strong> The ID of the finance account category to set up payment for.</li>
                  <li><strong>Payment Code:</strong> The payment code to associate with the category.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong>
                <ul>
                  <li>Fetches the branch and checks if the finance account category belongs to the branch.</li>
                  <li>Sets up the payment code for the finance account category if it exists.</li>
                  <li>Handles errors such as duplicate payment codes or missing inputs.</li>
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

          <div>
            <label
              htmlFor="categoryId"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Finance Account Category ID
            </label>
            <input
              type="text"
              id="categoryId"
              value={categoryId}
              onChange={handleCategoryIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter Finance Account Category ID"
            />
          </div>

          <div>
            <label
              htmlFor="paymentCode"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Payment Code
            </label>
            <input
              type="text"
              id="paymentCode"
              value={paymentCode}
              onChange={handlePaymentCodeChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter Payment Code"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPaymentSetupCommand;
