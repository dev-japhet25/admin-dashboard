import { useState } from "react";
import Popover from '@/components/Popover';
import { sendSlackCommand } from "@/lib/api";
import Button from '@/components/Button';
import { Modal } from "@/components/Modal/Modal";
import ImageLoader from "@/components/Loader/Loader";

const AllAdminsCommand = () => {
  const [churchIds, setChurchIds] = useState("");
  const [includeExclude, setIncludeExclude] = useState("include");
  const [includeCsv, setIncludeCsv] = useState(false);
  const [allChurches, setAllChurches] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)

  const handleChurchIdsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChurchIds(e.target.value);
  };

  const handleIncludeExcludeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIncludeExclude(e.target.value);
  };

  const handleIncludeCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeCsv(e.target.checked);
  };

  const handleAllChurchesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllChurches(e.target.checked);
  };

  function onClick() {
    setOpen(false)
    setResponse("")
  }
  const handleSubmit = async () => {
    setLoading(true)
    let commandText = "";
    if (allChurches) {
      commandText += "all";
    } else {
      if (churchIds) {
        commandText += `${includeExclude} ${churchIds}`;
      }
    }
    if (includeCsv) {
      commandText += " csv";
    }

    try {
      const result = await sendSlackCommand("/all_admins", commandText);
      console.log(result);
      setLoading(false)
      setOpen(true)
      setResponse(result);
    } catch (error: any) {
      setLoading(false)
      setResponse("An error occurred while fetching data.");
    }
  };

  // Function to parse the response string
  const parseResponse = (response: string) => {
    const lines = response.split("\n").filter((line) => line.trim() !== "");
    const resultLine = lines.find((line) => line.includes("result"));
    const emailsLine = lines.find((line) => line.includes("Emails"));
    const downloadLinkLine = lines.find((line) =>
      line.includes("Download link")
    );

    const resultCount = resultLine?.match(/\d+/)?.[0] || "0";
    const emails = emailsLine?.split("Emails")[1]?.trim() || "No emails found";
    const downloadLink =
      downloadLinkLine?.split("Download link")[1]?.trim() || null;

    return {
      resultCount,
      emails,
      downloadLink,
    };
  };

  const { resultCount, emails, downloadLink } = response
    ? parseResponse(response)
    : { resultCount: "0", emails: "No emails", downloadLink: null };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            All Admins Command
          </h2>
          <div>
            <Popover title="All Admins Command">
              <h3 className="font-semibold text-lg mb-2">
                /all_admins Command
              </h3>
              <p>
                <strong>Purpose:</strong> Retrieve a list of all church and
                branch admins with optional filtering.
              </p>
              <p>
                <strong>Parameters:</strong>
                <ul>
                  <li>
                    <strong>Include/Exclude Church IDs:</strong> Choose whether
                    to include or exclude specific church IDs.
                  </li>
                  <li>
                    <strong>All Churches:</strong> Option to retrieve all church
                    admins.
                  </li>
                  <li>
                    <strong>CSV Download:</strong> Option to include a CSV
                    download link of the results.
                  </li>
                </ul>
              </p>
              <p>
                <strong>Functionality:</strong>
                <ul>
                  <li>
                    Filters admins based on last login within the last 90 days.
                  </li>
                  <li>Generates a downloadable CSV file if requested.</li>
                  <li>
                    Supports both inclusion and exclusion of specific church
                    IDs.
                  </li>
                </ul>
              </p>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          {/* All Churches Checkbox */}
          <div>
            <label
              htmlFor="allChurchesCheckbox"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Retrieve All Church Admins
            </label>
            <input
              type="checkbox"
              id="allChurchesCheckbox"
              checked={allChurches}
              onChange={handleAllChurchesChange}
              className="p-2 border border-gray-300 rounded-md "
            />
            <span className="ml-2 text-gray-900">
              Select to retrieve all admins across churches
            </span>
          </div>

          {/* Include/Exclude Select */}
          <div>
            <label
              htmlFor="includeExcludeSelect"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Include or Exclude Church IDs
            </label>
            <select
              id="includeExcludeSelect"
              value={includeExclude}
              onChange={handleIncludeExcludeChange}
              disabled={allChurches}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="include">Include</option>
              <option value="exclude">Exclude</option>
            </select>
          </div>

          {/* Church IDs Input */}
          <div>
            <label
              htmlFor="churchIdsInput"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Church IDs (comma-separated)
            </label>
            <input
              type="text"
              id="churchIdsInput"
              value={churchIds}
              onChange={handleChurchIdsChange}
              disabled={allChurches}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter church IDs separated by commas"
            />
          </div>

          {/* CSV Download Checkbox */}
          <div>
            <label
              htmlFor="includeCsvCheckbox"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Include CSV Download
            </label>
            <input
              type="checkbox"
              id="includeCsvCheckbox"
              checked={includeCsv}
              onChange={handleIncludeCsvChange}
              className="p-2 border border-gray-300 rounded-md text-gray-900"
            />
            <span className="ml-2 text-gray-900">
              Select to include a downloadable CSV of admin emails
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="my-6 text-center">
          {/* <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Command
          </button> */}

          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Response Display */}
        {response && <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="All Admins">
          {response && (
            <div className="mt-2 p-6 rounded-md border bg-gray-50 shadow-lg">
              <p className="text-lg font-bold text-gray-700 text-center">
                Found <span className="text-blue-600">{resultCount}</span> result
                {resultCount !== "1" && "s"}
              </p>
              <div className="my-4 text-center">
                <p className="text-md text-gray-700">Emails: {emails}</p>
              </div>
              {downloadLink && (
                <div className="my-4 text-center">
                  <a
                    href={downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download CSV
                  </a>
                </div>
              )}
            </div>
          )}
        </Modal>}
        {loading && (<ImageLoader />)}
      </div>

    </div>
  );
};

export default AllAdminsCommand;
