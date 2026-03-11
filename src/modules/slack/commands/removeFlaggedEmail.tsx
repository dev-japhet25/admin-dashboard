import { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from "@/lib/api";
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';



const RemoveFlaggedEmailCommand = () => {
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
            const response = await sendSlackCommand("/remove_flagged", searchText);
            setResponse(response);
            setOpen(true)
            if (response) {
                setLoading(false)
            }

            if (!response.startsWith("Successfully") && !response.startsWith("Email")) {
                toast.error(response)
            }
        } catch (error: any) {
            setResponse(error.message);
            setLoading(false)
        }
    };


    return (
        <div className="flex justify-center w-full">
            <div className="w-2/3">
                <div className='flex justify-between my-6'>
                    <h2 className="text-xl font-semibold text-gray-900 text-center">
                        Remove Flagged Email Command
                    </h2>
                    <div>
                        <Popover title="Remove Flagged Email Command">
                            <h3 className="font-semibold text-lg mb-2">/remove_flagged Command</h3>
                            <p><strong>Purpose:</strong> Removes an email from the flagged email database if it exists.</p>
                            <p><strong>Parameters:</strong>
                                <ul>
                                    <li>Email Address: The email you want to un-flag.</li>
                                </ul>
                            </p>
                            <p><strong>Functionality:</strong>
                                <ul>
                                    <li>Searches the FlaggedEmail model for the provided email address.</li>
                                    <li>Permanently deletes the record from the database.</li>
                                    <li>Returns a success confirmation or informs you if the email was not found.</li>
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
                            placeholder="Enter email address to remove"
                        />
                    </div>
                    <Button handleSubmit={handleSubmit} loading={loading} />
                </div>

                {response && (
                    <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Remove Flagged Email"
                        className="sm:w-[100%] max-w-[900px]  md:ml-[0%]  lg:max-w-[940px] xl:max-w-[820px] lg:mt-2  lg:ml-[1%] xl:ml-[1%] mx-auto transform overflow-auto  rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8">
                        <div className="mt-6 p-6 rounded-md border shadow-lg text-center"
                            style={{
                                backgroundColor: response.startsWith("Successfully") ? '#f0fdf4' : '#fffbeb',
                                borderColor: response.startsWith("Successfully") ? '#bbf7d0' : '#fef08a'
                            }}>
                            <p className="text-gray-800 text-lg font-medium">{response}</p>
                        </div>
                    </Modal>
                )}

                {loading && (<ImageLoader />)}

            </div>
        </div>
    );
};

export default RemoveFlaggedEmailCommand;
