import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';

const Topup = () => {
    const [creditType, setCreditType] = useState('');
    const [churchId, setChurchId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [units, setUnits] = useState('');
    const [amount, setAmount] = useState('');
    const [unitsType, setUnitsType] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [onBehalfOf, setOnBehalfOf] = useState('');
    const [currency, setCurrency] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
        setState(e.target.value);
    };
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="flex justify-center w-full">
            <div className="w-2/3">
                <div className='flex justify-between my-6 '>
                    <h2 className="text-xl font-semibold text-gray-900 text-center">
                        Topup Command
                    </h2>
                    <div>
                        <Popover title="Top Up ">
                            <h3 className="font-semibold text-lg my-2">4. /topup Command</h3>
                            <p><strong>Purpose:</strong> Credits SMS units to a church or branch account.</p>
                            <p><strong>Parameters:</strong> Credit Type (type of credit), Church ID / Branch ID (identifiers), Units, Amount, Owner ID (details of the top-up).</p>
                            <p><strong>Functionality:</strong> Performs SMS credit top-ups for a specified church or branch.</p>
                        </Popover>
                    </div>
                </div>


                <div className="space-y-4">
                    <div>
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
                            onChange={(e) => handleInputChange(e, setCreditType)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Credit Type"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="churchId"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Church ID
                        </label>
                        <input
                            type="text"
                            id="churchId"
                            value={churchId}
                            onChange={(e) => handleInputChange(e, setChurchId)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Church ID"
                        />
                    </div>
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
                            onChange={(e) => handleInputChange(e, setBranchId)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Branch ID"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="units"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Units
                        </label>
                        <input
                            type="text"
                            id="units"
                            value={units}
                            onChange={(e) => handleInputChange(e, setUnits)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Units"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="amount"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Amount
                        </label>
                        <input
                            type="text"
                            id="amount"
                            value={amount}
                            onChange={(e) => handleInputChange(e, setAmount)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Amount"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="unitsType"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Units Type
                        </label>
                        <input
                            type="text"
                            id="unitsType"
                            value={unitsType}
                            onChange={(e) => handleInputChange(e, setUnitsType)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Units Type"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="ownerId"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Owner ID
                        </label>
                        <input
                            type="text"
                            id="ownerId"
                            value={ownerId}
                            onChange={(e) => handleInputChange(e, setOwnerId)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Owner ID"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="onBehalfOf"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            On Behalf Of
                        </label>
                        <input
                            type="text"
                            id="onBehalfOf"
                            value={onBehalfOf}
                            onChange={(e) => handleInputChange(e, setOnBehalfOf)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter On Behalf Of"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="currency"
                            className="block mb-2 text-md font-medium text-gray-900"
                        >
                            Currency
                        </label>
                        <input
                            type="text"
                            id="currency"
                            value={currency}
                            onChange={(e) => handleInputChange(e, setCurrency)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                            placeholder="Enter Currency"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topup;
