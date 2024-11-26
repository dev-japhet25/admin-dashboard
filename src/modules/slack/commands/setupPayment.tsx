import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from '@/lib/api';
import toast from 'react-hot-toast';
import { ResponseCard } from '@/components/ResponseCard';
import { isObject } from '@/lib/helpers/format';
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';

const SetupPaymentCommand = () => {
  const [command, setCommand] = useState('/setup_branch_payment');
  const [id, setId] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [update, setUpdate] = useState('');
  const [response, setResponse] = useState<string | string>("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)

  const handleCommandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCommand(e.target.value);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePubKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPubKey(e.target.value);
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.checked) {
      setUpdate("update");
    }
    else {
      setUpdate("");
    }
  };

  let slackCommand = `${id} ${pubKey} ${update}`
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand(command, slackCommand);
      setResponse(response);
  
      if (response) {
        setOpen(true)
        setLoading(false)
      }
      if (!response.split("").includes("\n")) {
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

  const formatText = response.split("\n").filter((value, index, arr) => {
    return value !== '--------------------------------------------' && value !== "";
  });

  const fields: { [fields: string]: string } = {}
  formatText.forEach((val) => {
  
    let eachText = val.split(":")
    let [key, value] = eachText;
    fields[key.trim()] = value
  });

  let action = formatText[0]?.split(":")[1].replaceAll(".", "");
  let formatActionA = action && action.split(" ").slice(0, 3).join(" ") + "\n"
  let formatActionB = action && action.split(" ").slice(3).join(" ")
  fields.Action = `${formatActionA} ${formatActionB}`

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
          <div className='flex justify-center my-4 bg-red-200 rounded p-4 text-gray-800 text-md font-sans font-semibold'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg> Sometimes this slack command times out 
          </div>
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
              <option value="/setup_branch_payment">Setup Branch Payment</option>
              <option value="/setup_church_payment">Setup Church Payment</option>
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
          <div className='flex justify-end flex-row-reverse'>
            <label
              htmlFor="isUpdate"
              className="block mb-2 text-md font-medium text-gray-900 mx-3"
            >
              Update Existing Credentials
            </label>
            <input
              type="checkbox"
              id="isUpdate"
              checked={update ? true : false}
              onChange={handleUpdateChange}
              className="w-5 h-5"
            />
          </div>
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>
        {Object.keys(fields).length > 0 && isObject(fields) && response && (<Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Set Up Payment">
          <ResponseCard entityKey={Object.keys(fields) || null} entityValue={Object.values(fields) || null} headerA='Title' headerB='Values' />
        </Modal>)}
        {loading && (<ImageLoader />)}
      </div>
    </div>
  );
};

export default SetupPaymentCommand;
