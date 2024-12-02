import { useState } from "react";
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";
import { Modal } from "@/components/Modal/Modal";
import toast from "react-hot-toast";
import ImageLoader from "@/components/Loader/Loader";

const BalanceCommand = () => {
  const [branchId, setBranchId] = useState("");
  const [churchId,setChurchId] = useState("")
  const [creditType, setCreditType] = useState("");
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchId(e.target.value);
  };


  const handleChurchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChurchId(e.target.value);
  };

  const handleCreditTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditType(e.target.value);
  };

  const [response, setResponse] = useState<string | null>(null);

  function onClick() {
    setOpen(false)
    setResponse("")
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand(
        "/balance",
        `${branchId} ${creditType} ${churchId}`
      );
      setResponse(response);
      if (response) {
        setLoading(false)
        setOpen(true)
      }

    } catch (error: any) {
      setLoading(false)
      setResponse(error.message);
      if (error) {
        toast.error(response)
      }
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Balance Command
          </h2>
          <div>
            <Popover title="Balance Command">
              <h3 className="font-semibold text-lg mb-2">/balance Command</h3>
              <p>
                <strong>Purpose:</strong> Retrieves and displays the SMS balance
                details for a specific branch or church.
              </p>
              <p>
                <strong>Parameters:</strong> Branch ID (optional) and Credit
                Type (optional). If Branch ID is provided, fetches data specific
                to that branch; otherwise, data is for the entire church. Credit
                Type specifies the type of SMS balance to retrieve.
              </p>
              <p>
                <strong>Functionality:</strong> Shows detailed SMS balance
                information, including formatted date fields.
              </p>
            </Popover>
          </div>
        </div>
        <div className="my-4">
          <div className='flex justify-center my-4 bg-blue-200 rounded p-4 text-gray-800 text-md font-sans font-semibold'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>Either Church or Branch Field may be optional
          </div>
          <div className="my-4">
            <label
              htmlFor="branchId"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Church ID
            </label>
            <input
              type="text"
              id="branchId"
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
              htmlFor="creditType"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Credit Type
            </label>
            <input
              type="text"
              id="creditType"
              value={creditType}
              onChange={handleCreditTypeChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter Credit Type"
            />

            <div className="my-6 text-center">
              <Button handleSubmit={handleSubmit} loading={loading} />
            </div>
            {response && (<Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Balance">
              {response && (
                <div className="mt-6 p-6 rounded-md border bg-gray-50 shadow-lg max-h-96 overflow-auto">
                  {/* Dynamically Extract Church and Branch */}
                  <div className="mb-4">
                    <p className="text-lg font-bold text-gray-700 text-center">
                      Church:{" "}
                      {response
                        .split("\n")[1]
                        ?.replace(/(\*|)/g, "")
                        ?.replace("Church:", "")}
                    </p>
                    <p className="text-lg font-bold text-gray-700 text-center p-1">
                      Branch:{" "}
                      {response
                        .split("\n")[2]
                        ?.replace(/(\*|)/g, "")
                        ?.replace("Branch:", "")}
                    </p>
                  </div>

                  {/* SMS Details Section */}
                  {/* <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
                    SMS DETAILS
                  </h3> */}

                  <div className="">
                    {[4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
                      <div
                        key={index}
                        className="whitespace-normal flex justify-between items-center p-5 capitalize text-gray-500 rounded-lg shadow-sm"
                      >
                        <p>
                          {
                            response
                              .split("\n")
                            [index]?.replace(/(\*|)/g, "")
                              ?.split(":")[0]
                          }
                        </p>
                        <p className="p-1">
                          <span className=" bg-blue-100 text-blue-500 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                            {
                              response
                                ?.split("\n")
                              [index]?.replace(/(\*|)/g, "")
                                ?.split(":")[1]
                            }
                          </span>
                        </p>


                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Modal>)}
            {loading && (<ImageLoader />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCommand;
