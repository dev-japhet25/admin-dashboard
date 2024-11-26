import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from '@/lib/api';
import { ResponseCard } from '@/components/ResponseCard';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import { isObject } from '@/lib/helpers/format';
import ImageLoader from '@/components/Loader/Loader';


const SubscriptionSetupCommand = () => {
  const [subscriptionType, setSubscriptionType] = useState('');
  const [churchId, setChurchId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [noDays, setNoDays] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [churchSize, setChurchSize] = useState('');
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null);
  const [open,setOpen] =useState(true)
  let command = `${subscriptionType} ${churchId} ${branchId} ${noDays} ${expiryDate} ${churchSize}`;
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand("/subscription_setup", command);
      setResponse(response);
      setOpen(true)
      if (response) {
        setLoading(false)
      }
      if (!response.startsWith("*")) {
        if (response === 'Provide either a church or branch id') {
          toast.error("Sorry branch or Church Id should be 0")
          return;
        }
        toast.error(response)
        return;
      }
    } catch (error: any) {
      setResponse(error.message);
      setLoading(false)
    }
  };


  const formatData = response?.split("\n").slice(3).splice(0, 5)
 

  const results = formatData?.map((val, index) => {
    if (index === 0) {
      return val.split(" Branch ")
    }
    if (index === 2) {
      let days = val.split(" ")
      return [`No of Days :${days[2]}`]
    }
    else {
      return val;
    }
  }).flatMap((val) => val)

  const fields: { [key: string]: string } = {}

  results?.forEach((text) => {
    let eachText = text.split(":");
    let [key, value] = eachText;
    if (key && value) {
      fields[key] = value
    }
  })

 
  const handleSubscriptionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubscriptionType(e.target.value);
  };

  const handleChurchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChurchId(e.target.value);
  };

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const handleNoDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoDays(e.target.value);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  const handleChurchSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChurchSize(e.target.value);
  };
  function onClick() {
    setOpen(false)
    setResponse("")
}
  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Subscription Setup Command
          </h2>
          <div>
            <Popover title="Subscription Setup Command">
              <h3 className="font-semibold text-lg mb-2">/subscription_setup Command</h3>
              <p><strong>Purpose:</strong> Set up or adjust a subscription for a church or branch.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li><strong>subscription_type:</strong> Increase or decrease the subscription.</li>
                  <li><strong>church_id:</strong> ID of the church.</li>
                  <li><strong>branch_id:</strong> ID of the branch.</li>
                  <li><strong>no_days:</strong> Number of days to increase or decrease the subscription.</li>
                  <li><strong>expiry_date:</strong> The date to set the subscription expiry.</li>
                  <li><strong>church_size (optional):</strong> Adjust church size, if applicable.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong>
                <ul>
                  <li>Updates subscription based on the type and the provided days or date.</li>
                  <li>Handles both church and branch subscriptions.</li>
                  <li>Allows optional adjustment of church size.</li>
                </ul>
              </p>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          {/* Subscription Type Select */}
          <div>
            <label
              htmlFor="subscriptionTypeSelect"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Subscription Type
            </label>
            <select
              id="subscriptionTypeSelect"
              value={subscriptionType}
              onChange={handleSubscriptionTypeChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="">Select subscription type</option>
              <option value="increase">Increase</option>
              <option value="decrease">Decrease</option>
            </select>
          </div>

          {/* Church ID Input */}
          <div>
            <label
              htmlFor="churchIdInput"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Church ID
            </label>
            <input
              type="text"
              id="churchIdInput"
              value={churchId}
              onChange={handleChurchIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter church ID" />
          </div>

          {/* Branch ID Input */}
          <div>
            <label
              htmlFor="branchIdInput"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Branch ID
            </label>
            <input
              type="text"
              id="branchIdInput"
              value={branchId}
              onChange={handleBranchIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter branch ID" />
          </div>

          {/* No. of Days Input */}
          <div>
            <label
              htmlFor="noDaysInput"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Number of Days
            </label>
            <input
              type="number"
              id="noDaysInput"
              value={noDays}
              onChange={handleNoDaysChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter number of days" />
          </div>

          {/* Expiry Date Input */}
          <div>
            <label
              htmlFor="expiryDateInput"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Expiry Date
            </label>
            <input
              type="date"
              id="expiryDateInput"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900" />
          </div>

          {/* Church Size Input (Optional) */}
          <div>
            <label
              htmlFor="churchSizeInput"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Church Size (Optional)
            </label>
            <input
              type="number"
              id="churchSizeInput"
              value={churchSize}
              onChange={handleChurchSizeChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter church size" />
          </div>
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>
        {Object.keys(fields).length > 0 && isObject(fields) && response &&   (<Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Set Up Ussd">
        <ResponseCard entityKey={Object.keys(fields) || null} entityValue={Object.values(fields) || null} headerA='Heading' headerB='Values' />
        </Modal>)}
        {loading && (<ImageLoader />)}
      </div>
    </div>
  );
};

export default SubscriptionSetupCommand;
