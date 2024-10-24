import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const SetupUssd = () => {
    const [branchId, setBranchId] = useState('');
    const [ussdId, setUssdId] = useState('');

    const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBranchId(e.target.value);
    };

    const handleUssdIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUssdId(e.target.value);
    };

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
                </div>
            </div>
        </div>
    );
};

export default SetupUssd;
