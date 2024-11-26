import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from '@/lib/api';
import { isObject } from '@/lib/helpers/format';
import { ResponseCard } from '@/components/ResponseCard';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';

const CategoryPaymentSetupCommand = () => {
  const [branchId, setBranchId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [paymentCode, setPaymentCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | string>("")
  const [open, setOpen] = useState(true)

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
    setResponse("")
  };

  const handleCategoryIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryId(e.target.value);
    setResponse("")
  };

  const handlePaymentCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentCode(e.target.value);
    setResponse("")
  };

  let command = `${branchId} ${categoryId} ${paymentCode}`;


  function onClick() {
    setOpen(false)
    setResponse("")
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand("/category_payment_setup", command);
      setResponse(response);
      setOpen(true)
      setLoading(false)
      if (!response.match(/\*([\w\s]+)\*\s`([^`]+)`/g)) {
        toast.error(response)
        setResponse("")
      }
    } catch (error: any) {
      setResponse(error.message);
      setLoading(false)
      toast.error(error.message)
    }
  };


  let formatText = response.split("\n");
  let formattedData = formatText.slice(3).concat(formatText.slice(0, 1));
  let fields: { [key: string]: string } = {}

  formattedData.forEach((val) => {
    let eachText = val.charAt(0).replace("*", "") + val.slice(1)
    let [key, value] = eachText.split("*")
    if (key && value) {
      fields[key.trim()] = value.trim().replaceAll("`", "")
    }
  })
  ///fields.message = formattedData[formattedData.length - 1].replaceAll('*', '')

  console.log('my fields text', fields)
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
          <div className='flex justify-center my-4 bg-red-200 rounded p-4 text-gray-800 text-md font-sans font-semibold'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg> Sometimes this slack command times out
          </div>
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
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>
        {Object.keys(fields).length > 0 && isObject(fields) && response && (
          <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Category Payment SetUp">
            <ResponseCard entityKey={Object.keys(fields).map((a) => a.replace("*", "")) || null} entityValue={Object.values(fields).map((a) => a.replace("*", ""))} headerA='Title' headerB='Values' />
          </Modal>
        )}
        {loading && (<ImageLoader />)}
      </div>
    </div>
  );
};

export default CategoryPaymentSetupCommand;
