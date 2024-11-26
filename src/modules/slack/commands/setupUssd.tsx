import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from '@/lib/api';
import { ResponseCard } from '@/components/ResponseCard';
import toast from "react-hot-toast";
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';

const SetupUssd = () => {
    const [branchId, setBranchId] = useState('');
    const [ussdId, setUssdId] = useState('');
    const [churchId, setChurchUsdId] = useState('')
    let [response, setResponse] = useState<string | string>("");
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(true)
    const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBranchId(e.target.value);
    };

    const handleChurchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChurchUsdId(e.target.value);
    };

    const handleUssdIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUssdId(e.target.value);
    };

    let textCommand = "";
    textCommand += `${branchId} ${ussdId} ${churchId}`;

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await sendSlackCommand("/setup_ussd", textCommand);
            setResponse(response);
            setOpen(true)
            //  setBranchId("")
            //  setUssdId("")
            if (response) {
                setLoading(false)
            }
            if (!response.match(/(?:\*?([\w\s]+)\*?):\s*([^\n]+)/g)) {
                toast.error(response)
            }
            else if (textCommand.includes("reset")) {
                let cleanedResponse = response.replace(/\*:/g, "");
                toast.success(cleanedResponse)
            }
        } catch (error: any) {
            setResponse(error.message);
            setLoading(false)
        }
    };

    console.log('yyyyy', response)

    function onClick() {
        setOpen(false)
        setResponse("")
    }


    function extractText(text: any) {
        let fields: { [key: string]: string } = {};
        text.replace(/(?:\*?([\w\s]+)\*?):\s*([^\n]+)/g, (_: string, key: string, value: string) => {
            const formattedKey = key.trim().replace(/\s+/g, "").toLowerCase();
            fields[formattedKey] = value.trim();
            return _;
        });


        if (fields["status"]) {
            fields["status"] = fields["status"].replace(/USSD:\s*(\*\d+\*)/, (match: string, ussdCode: string) => {
                fields["ussd"] = ussdCode.trim(); // Add `ussd` code as a separate field
                return ""; // Remove USSD part from the `status`
            }).trim();
        }
        return fields;
    }
    let checkMatches = response.match(/(?:\*?([\w\s]+)\*?):\s*([^\n]+)/g) ? extractText(response) : response;
    console.log(checkMatches);

    function isObject(value: any) {
        return value !== null && typeof value === 'object' && !Array.isArray(value)
    }

    console.log('object is', isObject(checkMatches))


    return (
        <div className="flex justify-center w-full">
            <div className="w-2/3">
                <div className='flex justify-between my-6 '>
                    <h2 className="text-xl font-semibold text-gray-900 text-center">
                        Setup USSD Command
                    </h2>
                    <div>
                        <Popover title=" Setup USSD">
                            <h3 className="font-semibold text-lg my-2">2. /setup_ussd Command</h3>
                            <p><strong>Purpose:</strong> Sets or resets the USSD code for a specific branch.</p>
                            <p><strong>Parameters:</strong> Branch ID (the branch to configure) and USSD ID (the code to assign or "reset").</p>
                            <p><strong>Functionality:</strong> Assigns a new USSD code to a branch or resets an existing one.</p>
                        </Popover>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className='flex justify-center my-4 bg-blue-200 rounded p-4 text-gray-800 text-md font-sans font-semibold'>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>Either Church or Branch Field may be optional
                    </div>
                    <div className="my-10">
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
                            placeholder="Enter Branch ID"
                        />
                    </div>

                    <div className="my-10">
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
                    <div>
                        <label
                            htmlFor="ussdId"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            USSD ID or "reset"
                        </label>
                        <input
                            type="text"
                            id="ussdId"
                            value={ussdId}
                            onChange={handleUssdIdChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter USSD ID or 'reset'"
                        />
                    </div>
                    <Button handleSubmit={handleSubmit} loading={loading} />
                </div>

                {!response.split(" ").includes("reset") && isObject(checkMatches) && (<Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Set Up Ussd">
                    <ResponseCard entityKey={Object.keys(checkMatches) || null} entityValue={checkMatches && Object.values(checkMatches).map((val) => val.replaceAll("*", "")) || null} headerA='Branches' headerB='Ussd Codes' />
                </Modal>)

                }
                {loading && (<ImageLoader />)}
            </div>
        </div>
    );
};

export default SetupUssd;
