import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";
import {ResponseCard} from '@/components/ResponseCard';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';

const UssdBranchesCommand = () => {
  const [searchText, setSearchText] = useState('');
  const [response, setResponse] = useState<string | null>(null);
   const [open,setOpen] = useState(true)
   const [loading,setLoading] =useState(false)

   function onClick() {
    setOpen(false)
    setResponse("")
}
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setResponse("")
  };
 
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand("/ussd_branches",searchText);
      setResponse(response);
      setLoading(false)

      if(!response.includes("*")){
        toast.error(response)
        return;
      }
      setOpen(true)
    } catch (error: any) {
      setResponse(error.message);
      setLoading(false)
    }
  };
   
  
  const branchNames = response?.match(/(?<=\*Branch\*\s).+/g);

  // Extract USSD codes
  const ussdCodes = response?.match(/(?<=\*USSD Code\*\s)\d+/g);


 

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            USSD Branches Command
          </h2>
          <div>
            <Popover title="USSD Branches Command">
              <h3 className="font-semibold text-lg mb-2">/ussd_branches Command</h3>
              <p><strong>Purpose:</strong> Retrieves USSD codes for church branches based on USSD ID or 'all'.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li>Search Text: Can be a specific USSD ID or the keyword 'all'.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong>
                <ul>
                  <li>Searches for active church branches with a USSD code.</li>
                  <li>Allows exporting results to a CSV file if 'export' is included in the search text.</li>
                  <li>Displays branch details including branch name and USSD code.</li>
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
              placeholder="Enter USSD ID or 'all'"
            />
            <div className="my-6 text-center">
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Command
              </button>
            </div>
            { branchNames && branchNames?.length > 0  &&  (<Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Ussd Branches">
          <ResponseCard  entityKey={branchNames || null} entityValue={ussdCodes || null} headerA='Branches' headerB='Ussd Codes'/>
             </Modal>)
}

{loading && (<ImageLoader />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UssdBranchesCommand;
