import React, { useState } from "react";
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ChurchesCommand = () => {
  const [filterType, setFilterType] = useState<string>("");
  const [churchIds, setChurchIds] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [includeCsv, setIncludeCsv] = useState<boolean>(false);
  const [response, setResponse] = useState<{
    exportLink: string | null;
    churchData: any[];
  } | null>(null);
  const [error, setError] = useState<string>("");
  const [loading , setLoading] = useState<boolean>(false);

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleChurchIdsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChurchIds(e.target.value);
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };

  const handleIncludeCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeCsv(e.target.checked);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let commandText = "";

    if (filterType === "all") {
      commandText = "all";
    } else if (filterType === "include" || filterType === "exclude") {
      if (churchIds) {
        commandText = `${filterType} ${churchIds}`;
      } else {
        setError("Please enter Church IDs for include/exclude filter");
        return;
      }
    } else if (filterType === "expire") {
      if (fromDate || toDate) {
        commandText = `expire ${fromDate || ""} ${toDate || ""}`.trim();
      } else {
        setError("Please provide at least one date for expire filter");
        return;
      }
    }

    if (includeCsv) {
      commandText += " export";
    }

    // Send command to backend
    try {
      const result = await sendSlackCommand("/churches", commandText);
     
      if (result === "Please include account id of church in request") {
        setError("Please include account id of church in request");
      }else {
        const parsedResponse = parseChurchResponse(result);
        setResponse(parsedResponse);
        setError("");
      }
    } catch (error) {
      setError("An error occurred while fetching church data.");
    }

    setLoading(false);
  };

  const parseChurchResponse = (responseText: string) => {
    const lines = responseText.split("\n");
    const churchData: any[] = [];
    let exportLink: string | null = null;

    // Check for export link
    if (responseText.includes("https://")) {
      exportLink =
        responseText.match(/https?:\/\/[^\s]+/)?.[0].replace("*", "") || null;
    }

    let currentChurch: { [key: string]: string } = {};
    lines.forEach((line) => {
      if (line.startsWith("Name:")) {
        if (Object.keys(currentChurch).length > 0) {
          churchData.push(currentChurch);
        }
        currentChurch = {};

        // Parse Name and ID from the same line
        const nameIdMatch = line.match(/Name: (.+)ID: (\d+)/);
        if (nameIdMatch) {
          currentChurch["Name"] = nameIdMatch[1].trim();
          currentChurch["ID"] = nameIdMatch[2];
        } else {
          currentChurch["Name"] = line.replace("Name:", "").trim();
        }
      } else {
        const [key, ...valueParts] = line.split(":");
        if (key && valueParts.length > 0) {
          const value = valueParts.join(":").trim();
          currentChurch[key.trim()] = value;
        }
      }
    });

    if (Object.keys(currentChurch).length > 0) {
      churchData.push(currentChurch);
    }
    return { exportLink, churchData };
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="w-2/3">
          <div className="flex justify-between my-6">
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Churches Report Command
            </h2>
            <div>
              <Popover title="Churches Command">
                <h3 className="font-semibold text-lg mb-2">
                  /churches Command
                </h3>
                <p>
                  <strong>Purpose:</strong> Retrieves a report on churches based
                  on specified filters and optionally exports the data.
                </p>
                <p>
                  <strong>Parameters:</strong>
                  <ul>
                    <li>
                      <strong>Filter:</strong> Choose from 'all', 'include',
                      'exclude', 'expire' with optional dates.
                    </li>
                    <li>
                      <strong>Include CSV:</strong> Option to export the result
                      as CSV.
                    </li>
                  </ul>
                </p>
              </Popover>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="filterType"
                className="block mb-2 text-md font-medium text-gray-900"
              >
                Filter Type
              </label>
              <select
                id="filterType"
                value={filterType}
                onChange={handleFilterTypeChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              >
                <option value="">Select Filter Type</option>
                <option value="all">All</option>
                <option value="include">Include</option>
                <option value="exclude">Exclude</option>
                <option value="expire">Expire</option>
              </select>
            </div>

            {(filterType === "include" || filterType === "exclude") && (
              <div>
                <label
                  htmlFor="churchIds"
                  className="block mb-2 text-md font-medium text-gray-900"
                >
                  Church IDs (comma-separated)
                </label>
                <input
                  type="text"
                  id="churchIds"
                  value={churchIds}
                  onChange={handleChurchIdsChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                  placeholder="Enter church IDs"
                />
              </div>
            )}

            {filterType === "expire" && (
              <>
                <div>
                  <label
                    htmlFor="fromDate"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    From Date
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="toDate"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    To Date
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    value={toDate}
                    onChange={handleToDateChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                  />
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="includeCsv"
                className="block mb-2 text-md font-medium text-gray-900"
              >
                Include CSV Export
              </label>
              <input
                type="checkbox"
                id="includeCsv"
                checked={includeCsv}
                onChange={handleIncludeCsvChange}
                className="p-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>
          </div>

          <div className="my-6 text-center">
            <Button handleSubmit={handleSubmit} loading={loading} />
          </div>

          {
           !loading && error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}
        </div>
      </div>
      <div>
        {!loading && !error && response && (
          <ChurchTable
            churchData={response.churchData}
            exportLink={response.exportLink}
          />
        )}
      </div>
    </>
  );
};

export default ChurchesCommand;

interface ChurchInfo {
  Name: string;
  ID: string;
  "Member size": number;
  "Last Login": string;
  Leader: string;
  "Phone Number": string;
  "SAAS purchased": string;
  "SMS purchased": string;
  "Sign up date": string;
  "Expiry date": string;
  "Subscription status": string;
}

interface ChurchTableProps {
  churchData: ChurchInfo[];
  exportLink: string | null;
}

const ChurchTable: React.FC<ChurchTableProps> = ({
  churchData,
  exportLink,
}) => {
  return (
    <div className="overflow-x-auto text-gray-900">
      {exportLink && (
       <div className="flex justify-center my-4">
       <a
         href={exportLink}
         target="_blank"
         rel="noopener noreferrer"
         className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition"
       >
         Download CSV
       </a>
     </div>
     
      )}
      <table className="min-w-full overflow-x-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Member Size</th>
            <th className="border px-4 py-2">Last Login</th>
            <th className="border px-4 py-2">Leader</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">SAAS Purchased</th>
            <th className="border px-4 py-2">SMS Purchased</th>
            <th className="border px-4 py-2">Sign Up Date</th>
            <th className="border px-4 py-2">Expiry Date</th>
            <th className="border px-4 py-2">Subscription Status</th>
          </tr>
        </thead>
        <tbody>
          {churchData.map((church, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{church.Name}</td>
              <td className="border px-4 py-2">{church.ID}</td>
              <td className="border px-4 py-2">{church["Member size"]}</td>
              <td className="border px-4 py-2">
                {church["Last Login"]?.replace(/^_+|_+$/g, "")}
              </td>
              <td className="border px-4 py-2">
                {church.Leader?.replace(/^_+|_+$/g, "")}
              </td>
              <td className="border px-4 py-2">
                {church["Phone Number"]?.replace(/^_+|_+$/g, "")}
              </td>
              <td className="border px-4 py-2">{church["SAAS purchased"]}</td>
              <td className="border px-4 py-2">{church["SMS purchased"]}</td>
              <td className="border px-4 py-2">{church["Sign up date"]}</td>
              <td className="border px-4 py-2">{church["Expiry date"]}</td>
              <td className="border px-4 py-2">
                {church["Subscription status"]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
