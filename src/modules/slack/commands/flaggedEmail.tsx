import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";
import { ResponseCard } from '@/components/ResponseCard';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';



const FlaggedEmailCommand = () => {
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
            const response = await sendSlackCommand("/flagged", searchText);
            setResponse(response);
            setOpen(true)
            if (response) {
                setLoading(false)
            }

            if (!response.startsWith("*") && !response.startsWith("Found") && !response.startsWith("Email")) {
                toast.error(response)
            }
        } catch (error: any) {
            setResponse(error.message);
            setLoading(false)
        }
    };

    const regexSymbols = /\*([\\w\\s]+)\*\s`([^`]+)`/g;

    let fields: { [key: string]: string } = {}
    let match;

    // Parse the slack-style response format (*Key:* Value)
    const lines = response.split('\n').filter(line => line.trim() && !line.startsWith('---') && !line.startsWith('Found'));
    const parsedFields: { key: string; value: string }[] = [];
    lines.forEach(line => {
        const slackMatch = line.match(/^\*([^*]+):\*\s*(.+)$/);
        if (slackMatch) {
            parsedFields.push({ key: slackMatch[1].trim(), value: slackMatch[2].trim() });
        }
    });

    return (
        <div className="flex justify-center w-full">
            <div className="w-2/3">
                <div className='flex justify-between my-6'>
                    <h2 className="text-xl font-semibold text-gray-900 text-center">
                        Flagged Email Command
                    </h2>
                    <div>
                        <Popover title="Flagged Email Command">
                            <h3 className="font-semibold text-lg mb-2">/flagged Command</h3>
                            <p><strong>Purpose:</strong> Checks if an email address has been flagged (e.g., due to bounces).</p>
                            <p><strong>Parameters:</strong>
                                <ul>
                                    <li>Email Address: The email to check against the flagged email records.</li>
                                </ul>
                            </p>
                            <p><strong>Functionality:</strong>
                                <ul>
                                    <li>Searches the FlaggedEmail model for the provided email address.</li>
                                    <li>Displays flagged email details including bounce type, active status, and timestamps.</li>
                                    <li>Reports if the email is not flagged.</li>
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
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="searchText"
                            value={searchText}
                            onChange={handleSearchTextChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter email address to check"
                        />
                    </div>
                    <Button handleSubmit={handleSubmit} loading={loading} />
                </div>
                {parsedFields.length > 0 && (<Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Flagged Email"
                    className="sm:w-[100%] max-w-[900px]  md:ml-[0%]  lg:max-w-[940px] xl:max-w-[820px] lg:mt-2  lg:ml-[1%] xl:ml-[1%] mx-auto transform overflow-auto  rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8">
                    <ResponseCard entityKey={parsedFields.map(f => f.key)} entityValue={parsedFields.map(f => f.value)} headerA='Field' headerB='Value' />
                </Modal>)}

                {response && parsedFields.length === 0 && (
                    <div className="mt-6 p-4 rounded-md border bg-gray-50 shadow-lg">
                        <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
                    </div>
                )}

                {loading && (<ImageLoader />)}


            </div>
        </div>
    );
};

export default FlaggedEmailCommand;
