import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from '@/lib/api';
import { ResponseCard } from '@/components/ResponseCard';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';


const PaymentCategorySetup = () => {
  const [branchId, setBranchId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | string>("");
  const [open,setOpen] = useState(true)
  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const handleCategoryIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryId(e.target.value);
    setResponse("")
  };

  const handlePubKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPubKey(e.target.value);
    setResponse("")
  };

  const handleSubmit = async () => {
    let textCommand = '';
    textCommand += `${branchId} ${categoryId} ${pubKey}`
    setLoading(true)
    try {
      const response = await sendSlackCommand("/payment_category_setup", textCommand);
      setResponse(response);
      setOpen(true)
      if (response) {
        setLoading(false)
      }

      if (!response.match(/(?:\*?([\w\s]+)\*?):\s*([^\n]+)/g)) {
        //show toast error if the right commands are not sent
        toast.error(response)
      }
    } catch (error: any) {
      setResponse(error.message);
      setLoading(false)
    }
  };

  function extractText(text: any) {
    const regex = /Payment Category\s*([\w\s-]+)\nPub key:\s*([\d]+)\s*\nDate Created:\s*([\w\s,0-9:AMP]+)/;
    const match = text.match(regex);
    let extractedData = {};
    if (match) {
      extractedData = {
        paymentCategory: match[1].trim(),
        publicKey: match[2].trim(),
        dateCreated: match[3].trim()
      };
    }
      return extractedData;
  }

  function onClick() {
    setOpen(false)
    setResponse("")
}

  //check if the data has been parsed into an object
  let dataText = response.matchAll(/\*([\w\s]+)\*\s`([^`]+)`/g) ? extractText(response) : response;
  function isObject(txt: any) {
    return txt !== null && typeof txt === 'object' && !Array.isArray(txt);
  }
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
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>
        {Object.keys(dataText).length > 0 && isObject(dataText) && response &&  (<Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Payment Category SetUp">
        <ResponseCard entityKey={Object.keys(dataText) || null} entityValue={Object.values(dataText) || null} headerA='Heading' headerB='Values' />
          </Modal>)}
          {loading && (<ImageLoader />)}
      </div>

    </div>
  );
};

export default PaymentCategorySetup;
