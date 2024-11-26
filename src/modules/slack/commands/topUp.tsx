import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from '@/lib/api';
import toast from 'react-hot-toast';
import { ResponseCard } from '@/components/ResponseCard';
import { Modal } from '@/components/Modal/Modal';
import ImageLoader from '@/components/Loader/Loader';

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
    const [response, setResponse] = useState<string | string>("")
    const [loading, setLoading] = useState(false)

    // let commands = 'sms 1 0 5 2 1 2 2 3';
    let command = `${creditType} ${churchId} ${branchId} ${units} ${amount} ${unitsType} ${ownerId} ${onBehalfOf} ${currency}`
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
        setState(e.target.value);
    };


    const [open, setOpen] = useState(true)
    const fields: { [key: string]: string } = {}

    function onClick() {
        setOpen(false)
        setResponse("")
    }
    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await sendSlackCommand("/topup", command);
            setResponse(response);
            setOpen(true)
            console.log('This is the daaa', response)
            if (response) {
                setLoading(false)
            }
            if (!response.split("").includes("\n")) {
                //show toast error if the right commands are not sent
                toast.error(response)
                setResponse("")
                return;
            }
        } catch (error: any) {
            setLoading(false)
            toast.error(error.message)
            return;
        }
    };

    console.log('This is response', response)


    const formatText = response.split("\n")
    const reFormatText = formatText.map((text, index) => {
        if (index === 0) {
            return text.split(" Branch ")
        }
        if (index === 3) {
            let splitText = text.split(" ")
            return [`${splitText[0]}: ${splitText[1]}`]
        }
        if (index === 4) {
            let splitText = text.split(" ");
            return [`${splitText[0].concat(splitText[1])}: ${splitText[2]}`]
        }
        if (index === 5) {
            return text.split("id")
        }
        else {
            return text;
        }
    }).flatMap((val) => val).map((data, index) => index === 7 ? `id${data}` : index === 3 ? "Amount:".concat(data.split(" ")[data.split(" ").length - 1]) : data);
    console.log('reee', reFormatText)

    reFormatText.forEach((val) => {
        let eachText = val.split(":")
        let [key, value] = eachText

        if (key && value) {
            fields[key.trim()] = value.trim()
        }

    })

    console.log('the result', fields)
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
                <div className='flex justify-center my-4 bg-blue-200 rounded p-4 text-gray-800 text-md font-sans font-semibold'>
             
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                               <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                           </svg>Either Church or Branch Field may be optional - Input 0 where optional
         </div>
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
                    <Button handleSubmit={handleSubmit} loading={loading} />
                </div>

                {Object.keys(fields).length > 0 && (
                    <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Top Up">
                        <ResponseCard entityKey={Object.keys(fields).map((a) => a.replace("*", "")) || null} entityValue={Object.values(fields).map((a) => a.replace("*", ""))} headerA='Title' headerB='Values' />
                    </Modal>)}
                    {loading && (<ImageLoader />)}
            </div>
        </div>
    );
};

export default Topup;
