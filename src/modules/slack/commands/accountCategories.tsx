import { use, useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from '@/lib/api';
import { ResponseCard } from '@/components/ResponseCard';
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';
import toast from 'react-hot-toast';

const AccountCategoriesCommand = () => {
  const [branchId, setBranchId] = useState('');
  const [response, setResponse] = useState<string | string>("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand("/account_categories", branchId);
      setResponse(response);
      console.log('resp', response)

      setOpen(true)
      if (!response.includes("*")) {
        setLoading(false)
        toast.error(response)
        return;
      }
      if (response) {
        setLoading(false)
      }
    } catch (error: any) {
      setResponse(error.message);
      setLoading(false)
    }
  };

  function onClick() {
    setOpen(false)
    setResponse("")
  }

  let splitText = response.split("Results ");
  console.log(splitText)
  const filterData = splitText.slice(1).map(result => {
    console.log(result)
    const lines = result.split('\n');
    const obj: { [key: string]: string } = {};
    console.log(lines)
    lines.forEach(line => {
      const eachLine = line.charAt(0).replace("*", "") + line.slice(1);
      const [key, value] = eachLine.split("*");
      if (key && value) {
        console.log(key, value)
        obj[key.split(" ").join("")] = value.trim().replace("`", "");
      }
    });
    return obj;
  });
  console.log('ggg', filterData)
  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className='flex justify-between my-6'>
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Account Categories Command
          </h2>
          <div>
            <Popover title="Account Categories Command">
              <h3 className="font-semibold text-lg mb-2">/account_categories Command</h3>
              <p><strong>Purpose:</strong> Retrieves finance account categories for a specific branch.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li><strong>Branch ID:</strong> The ID of the branch to retrieve account categories for.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong>
                <ul>
                  <li>Searches for the branch based on the provided ID.</li>
                  <li>Retrieves finance account categories for the branch, including the default ones.</li>
                  <li>Displays the number of categories found and formats the result with details of each category.</li>
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
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>

        {filterData?.length > 0 && (
          <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Account Categories">


            <div className='max-h-96 overflow-auto'>
              {
                filterData?.map((val: any, index: number) => {
                  return (

                    <>
                      <ul className='sm:p-5'>
                        <li className="py-3 sm:py-4">
                          <div className="uppercase flex items-center text-md bg-blue-500 text-white p-1">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium  dark:text-white">
                                Title
                              </p>

                            </div>
                            <div className="inline-flex items-center text-2sm font-semibold text-gray-900 dark:text-white" />
                            Values
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                ID
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.ID}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Name
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Name}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Description
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Description}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Account Name
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.AccountName}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Currency
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Currency}
                          </div>
                        </li>

                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Members Can Contribute
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Memberscancontribute}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Account Name
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.AccountName}
                          </div>
                        </li>

                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Payment Code Branch
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Paymentcodebranch}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Recurrence
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Recurrence}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Rank
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Rank}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Show On Ussd
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Showonussd}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Show On Mobile
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Showonmobile}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Date Modified
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Datemodified}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Date Created
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Datecreated}
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-md font-medium text-gray-700 truncate dark:text-white">
                                Payment
                              </p>

                            </div>
                            <div className="inline-flex items-center text-md font-semibold text-gray-900 dark:text-white" />
                            {val.Paymentcode}
                          </div>
                        </li>
                      </ul>
                    </>
                  )
                })

              }


            </div>
          </Modal>)}
        {loading && (<ImageLoader />)}
      </div>
    </div>
  );
};

export default AccountCategoriesCommand;
