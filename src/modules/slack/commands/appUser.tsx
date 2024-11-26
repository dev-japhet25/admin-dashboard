import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";
import { ResponseCard } from '@/components/ResponseCard';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';
import Image from 'next/image';


const AppUserCommand = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | string>("");
  const [open, setOpen] = useState(true)
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  function onClick() {
    setOpen(false)
    setResponse("")
  }
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand("/app_user", searchText);
      setResponse(response);
      setOpen(true)
      if (response) {
        setLoading(false)
      }

      if (!response.startsWith("*")) {
        toast.error(response)
      }
    } catch (error: any) {
      setResponse(error.message);
      setLoading(false)
    }
  };

  const regexSymbols = /\*([\w\s]+)\*\s`([^`]+)`/g;

  let fields: { [key: string]: string } = {}
  let match;

  while ((match = regexSymbols.exec(response)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    fields[key] = value;
  }

  console.log('my fields ', fields)
  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            App User Command
          </h2>
          <div>
            <Popover title="App User Command">
              <h3 className="font-semibold text-lg mb-2">/app_user Command</h3>
              <p><strong>Purpose:</strong> Retrieves details of mobile app users based on email, phone number, or user ID.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li>Search Text: Can be an email address, phone number (starting with +), or user ID.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong>
                <ul>
                  <li>Searches for active users in the mobile app.</li>
                  <li>Displays user details including ID, name, email, phone number, and various settings.</li>
                </ul>
              </p>
            </Popover>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="searchText"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Search Text
            </label>
            <input
              type="text"
              id="searchText"
              value={searchText}
              onChange={handleSearchTextChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter email, phone number, or user ID"
            />
          </div>
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>
        {Object.keys(fields).length > 0 && (<Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="App User"
          className="sm:w-[100%] max-w-[900px]  md:ml-[0%]  lg:max-w-[940px] xl:max-w-[820px] lg:mt-2  lg:ml-[1%] xl:ml-[1%] mx-auto transform overflow-auto  rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8">
          <ResponseCard entityKey={Object.keys(fields) || null} entityValue={Object.values(fields) || null} headerA='Title' headerB='Values' />
        </Modal>)}



        {loading && (<ImageLoader />)}


      </div>
    </div>
  );
};

export default AppUserCommand;
