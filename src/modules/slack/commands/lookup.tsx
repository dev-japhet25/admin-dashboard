import { useState } from "react";
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";
import { Modal } from "@/components/Modal/Modal";
import ImageLoader from "@/components/Loader/Loader";

const LookupCommand = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const [response, setResponse] = useState<string | null>(null);
  const [open, setOpen] = useState(true)
  const [loading,setLoading] =useState(false)
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await sendSlackCommand("/ussd", searchQuery);
      setResponse(response);
      setLoading(false)
      setOpen(true)
    } catch (error: any) {
      setResponse(error.message);
      setLoading(false)
    }
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
            Lookup Command
          </h2>
          <div>
            <Popover title="Lookup Command">
              <h3 className="font-semibold text-lg mb-2">/lookup Command</h3>
              <p>
                <strong>Purpose:</strong> Searches for churches based on the
                provided query. If the query is an email, it retrieves the
                church associated with the user having that email. Otherwise, it
                performs a search based on the church name.
              </p>
              <p>
                <strong>Parameters:</strong>
                <ul>
                  <li>
                    Email Address: Searches for the church associated with the
                    provided email address.
                  </li>
                  <li>
                    Church Name: Searches for churches whose names match the
                    provided string or are similar to it.
                  </li>
                </ul>
              </p>
              <p>
                <strong>Functionality:</strong> Performs a search based on the
                query. If an email is provided, retrieves the associated church.
                For other queries, it uses full-text search and similarity
                matching to find churches. Displays the search results with
                details such as ID, church name, owner email, phone number,
                country, and signup date.
              </p>
            </Popover>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="searchQuery"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Search Query
            </label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter email or church name"
            />
            <div className="my-6 text-center">
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Command
              </button>
            </div>
           {response && <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Lookup">
              {response && (
                <div className="mt-6 rounded-md border bg-gray-50 shadow-lg max-h-96 overflow-auto">
                  {/* Header Section */}
                  <div className="mb-4">
                    <p className="text-lg font-bold text-blue-500 text-center">
                      Found {response.split("\n")[0]?.split("*")[1] || "N/A"}{" "}
                      result matching{" "}
                      <span className="text-blue-500">
                        {response.split("\n")[0]?.split("*")[3] || "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* Results Section */}
                  <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
                    {/* {response.split("\n")[3]?.replace(/(\*|)/g, "") || "Results"} */}
                  </h3>

                  <div className="space-y-4">
                    {[
                      { label: "Id", index: 5 },
                      { label: "Church Name", index: 6 },
                      { label: "Owner Email", index: 7 },
                      { label: "Phone No", index: 8 },
                      { label: "Country", index: 9 },
                      { label: "Signup On", index: 10 },
                    ].map((item) => {
                      const [key, value] =
                        response.split("\n")[item.index]?.split(":") || [];
                      return (
                        <div
                          key={item.index}
                          className="flex justify-between items-center p-4 rounded-lg shadow-sm"
                        >
                          <p className="font-medium text-gray-500">{key?.trim() || "N/A"}</p>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-0.5 mx-5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {value?.trim() || "N/A"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Modal>}
            {loading && (<ImageLoader />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookupCommand;
