import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from '@/lib/api';
import toast from 'react-hot-toast';
import { isObject } from '@/lib/helpers/format';
import { ResponseCard } from '@/components/ResponseCard';
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';

const SubscribeCommand = () => {
  const [churchId, setChurchId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [durationMonths, setDurationMonths] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [churchSize, setChurchSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | string>("");
  const [open, setOpen] = useState(true)

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

  let command = `${churchId} ${branchId} ${durationMonths} ${currency} ${amount} ${churchSize}`;
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand("/subscribe", command);
      setResponse(response);
      setOpen(true)
      
      if (response) {
        setLoading(false)
      }
      if (!response.startsWith("*")) {
        //show toast error if the right commands are not sent
        toast.error(response)
        setResponse("")
        return;
      }
    } catch (error: any) {
      setLoading(false)
      toast.error(error.message)
      return;
    }
  };

  function onClick() {
    setOpen(false)
    setResponse("")
}


  let formatText = response.split('\n');
  let fields: { [key: string]: string } = {}

  formatText.forEach((val) => {
    let eachText = val.replaceAll("*", "").split(":")

    let [key, value] = eachText

    if (key && value) {
      let valueText = value.split("");
      fields[key.trim()] = valueText.length > 21 && key === 'Description' ?
        valueText.slice(22).join("") : value.trim()
    }

  })

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
          <div className='flex justify-center my-4 bg-blue-200 rounded p-4 text-gray-800 text-md font-sans font-semibold'>
             
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                            </svg>Either Church or Branch Field may be optional - Input 0 where optional
          </div>
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
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>
        {Object.keys(fields).length > 0 && isObject(fields) && response && (<Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Subscription">
          <ResponseCard entityKey={Object.keys(fields) || null} entityValue={Object.values(fields) || null} headerA='Heading' headerB='Values' />
        </Modal>)}
        {loading && (<ImageLoader />)}
      </div>
    </div>
  );
};

export default SubscribeCommand;
