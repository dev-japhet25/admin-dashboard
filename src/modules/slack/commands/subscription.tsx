import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from '@/lib/api';
import toast from 'react-hot-toast';
import { ResponseCard } from '@/components/ResponseCard';
import { Modal } from '@/components/Modal/Modal';
import { isObject } from '@/lib/helpers/format';
import ImageLoader from '@/components/Loader/Loader';

const SubscriptionCommand = () => {
  const [branchId, setBranchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | string>("")
  const [open,setOpen] = useState(true)
  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const text = "Subscription Details\nChurch: Kali Chaple\nOn Free Tier: Yes\nOn Trial Phase: Yes\nExpiry Date: Fri, 17 Jun 2022 01:18PM\nCurrent Church Size: 0\n\n\nAccount does not have any Subscription History";
  //split by new lines 
  const newLine = response.split("\n");
 
  const fields: { [key: string]: string } = {}
  //loop through the newLine
  newLine.forEach((val) => {
   
    let [key, value] = val.split(":");
    if (key && value) {
      fields[key.trim()] = value.trim()
    }

  })

  function onClick() {
    setOpen(false)
    setResponse("")
}
 
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand("/subscription", branchId);
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

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Subscription Command
          </h2>
          <div>
            <Popover title="Subscription Command">
              <h3 className="font-semibold text-lg mb-2">/subscription Command</h3>
              <p><strong>Purpose:</strong> Checks the subscription status for a specific branch or church.</p>
              <p><strong>Parameters:</strong> Branch ID (optional). If Branch ID is provided, retrieves subscription details for that branch; otherwise, retrieves details for the entire church.</p>
              <p><strong>Functionality:</strong> Displays current subscription details including whether the subscription is on a free tier, trial phase, expiry date, and subscription history if available.</p>
            </Popover>
          </div>
        </div>
        <div className="space-y-4">
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
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>
        { Object.keys(fields).length > 0  && response && (<Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Subscription">
        <ResponseCard  entityKey={Object.keys(fields).map((a) => a.replace("*", "")) || null} entityValue={Object.values(fields).map((a) => a.replace("*", ""))} headerA='Title' headerB='Values'/>
         </Modal>)}
         {loading && (<ImageLoader />)}
</div>
    </div>
  );
};

export default SubscriptionCommand;
