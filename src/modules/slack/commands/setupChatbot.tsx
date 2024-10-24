import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const SetupChatbot = () => {
    const [branchId, setBranchId] = useState('');
    const [platform, setPlatform] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [provider, setProvider] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleBranchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBranchId(e.target.value);
    };

    const handlePlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlatform(e.target.value);
    };

    const handleUniqueIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUniqueId(e.target.value);
    };

    const handleSecretKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecretKey(e.target.value);
    };

    const handleProviderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProvider(e.target.value);
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    return (
        <div className="flex justify-center w-full">
            <div className="w-2/3">

                <div className='flex justify-between my-6 '>
                    <h2 className="text-xl font-semibold text-gray-900 text-center">
                        Setup Chatbot Command
                    </h2>
                    <div>
                        <Popover title="Setup Chatbot">
                            <h3 className="font-semibold text-lg my-2">3. /setup_chatbot Command</h3>
                            <p><strong>Purpose:</strong> Configures or resets chatbot settings for a branch.</p>
                            <p><strong>Parameters:</strong> Branch ID (the branch to configure), Platform, Unique ID, Secret Key, Provider, and Phone Number (chatbot setup details).</p>
                            <p><strong>Functionality:</strong> Sets up or resets a chatbot for a branch using the provided parameters.</p>
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
                    <div>
                        <label
                            htmlFor="platform"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Platform
                        </label>
                        <input
                            type="text"
                            id="platform"
                            value={platform}
                            onChange={handlePlatformChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Platform"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="uniqueId"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Unique ID
                        </label>
                        <input
                            type="text"
                            id="uniqueId"
                            value={uniqueId}
                            onChange={handleUniqueIdChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Unique ID"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="secretKey"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Secret Key
                        </label>
                        <input
                            type="text"
                            id="secretKey"
                            value={secretKey}
                            onChange={handleSecretKeyChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Secret Key"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="provider"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Provider
                        </label>
                        <input
                            type="text"
                            id="provider"
                            value={provider}
                            onChange={handleProviderChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Provider"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Phone Number"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetupChatbot;
