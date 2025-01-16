import Popover from "@/components/Popover";
import { sendSlackCommand } from "@/lib/api";
import React, { useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import ImageLoader from "@/components/Loader/Loader";
import { ResponseCard } from '@/components/ResponseCard';
import Button from "@/components/Button";
import toast from "react-hot-toast";

const VerifyPayments = () => {
  const [publicationKey, setPublicationKey] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [metaTransactionId, setMetaTransactionId] = useState("")
  const [responseMessage, setResponseMessage] = useState<string | string>("");
  const [responseBody, setResponseBody] = useState("")
  const [callBackUrl, setCallBackUrl] = useState("")
  const [showReconcillationModal, setShowReconcillationModal] = useState(false)


  const fields: { [key: string]: string } = {}

  const handleTransactionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionId(e.target.value);
  };

  const handleCallBackUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCallBackUrl(e.target.value);
  };

  const handlePublicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicationKey(e.target.value);
  };

  function onClick() {
    setOpen(false)
    setResponseMessage("")
    setShowReconcillationModal(false)
  }


  async function verifyPayments() {
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_VERIFYURL}${transactionId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicationKey}`
        }
      })

      // if (!response.ok) {
      //   throw new Error("Sorry an error occured")
      // }

      return response.json()
    }
    catch (error) {
      return error;
    }
  }


  const showReconcileModal = () => {
    setOpen((show) => !show)
    setResponseMessage("")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowReconcillationModal(true)
      setOpen(true)
    }, 2000)
  }

  async function ReconcilePayments() {
    setResponseMessage("")
    setLoading(true)
    setOpen(false)
    setShowReconcillationModal(false)
    try {
      // http://api.asoriba-local.com:8000/api/v1.2/payments/verification/470/asoribapay/
      //let callBackUrl = `${process.env.NEXT_PUBLIC_ASORIBA_API}payments/verification/${metaTransactionId}/asoribapay/`;
      //let callBackUrl = 'http://api.asoriba-local.com:8000/api/v1.2/payments/verification/470/asoribapay/';
      let response = await fetch(callBackUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicationKey}`
        },
        body: JSON.stringify(responseBody)
      })

      setLoading(false)
      setIsError(false)






      let data = await response.json()
      console.log('My data ', data)

      if (data) {
        toast.success('You have successfully reconcilled payments for this transaction')
      }

    }
    catch (error) {
      setIsError(true)
      setOpen(true)
      setLoading(false)
      setResponseMessage("Reconcillation for the transaction failed ensure callbackurl matches with transaction uuid and try again")
      console.log('my error', error)
      // throw new Error('Sorry an error occured')

    }
  }


  let formatObject: { [keys: string | number]: string | number } = {}
  const parseObject = (responseData: any) => {
    for (let key in responseData) {
      if (['string', 'number', 'boolean'].includes(typeof responseData[key])) {
        formatObject[key] = responseData[key]
      }
      else if (!Array.isArray(responseData[key])) {
        for (let innerKey in responseData[key]) {
          formatObject[innerKey] = responseData[key][innerKey]
        }
      }
      // console.log(Array.isArray(responseData[key] ))
      else if (Array.isArray(responseData[key]) && responseData[key].length > 0) {
        let formatArrayObj = responseData[key]['0'];

        for (let inner in formatArrayObj) {

          if (formatObject.hasOwnProperty("id")) {
            formatObject["line_items_id"] = String(formatArrayObj["id"])
          }
          if (formatObject.hasOwnProperty("currency")) {
            formatObject["line_items_currency"] = formatArrayObj["currency"]
          }
          else {
            formatObject[inner] = String(formatArrayObj[inner])
          }
        }

      }

    }

    return formatObject;
  }


 
  const handleSubmit = async () => {
    // Basic validation
    if (!publicationKey || !transactionId) {
      setLoading(false)
      setOpen(true)
      setIsError(true);
      setResponseMessage("enter both publication key and transaction id");
      return;
    }
    setLoading(true)
    try {
      const responseData = await verifyPayments();
      if (Object.keys(responseData).includes("error")) {
        let resp = responseData && Object.values(responseData)[0]?.toString()
        setResponseMessage(resp)
        setLoading(false)
        setIsError(true)
        setOpen(true)
        return;
      }

      //if no error and successful response keep response body
      setResponseBody(responseData)
      let parseData = responseData && parseObject(responseData)
      setResponseMessage(parseData)
      const { line_items } = responseData;
      const transactionData = line_items.reverse().find((data: any, index: number) => data)
      const { metadata } = transactionData;
      setMetaTransactionId(metadata?.transaction)
      setLoading(false)
      setOpen(true)
      setIsError(false)

    } catch (error: any) {
      setIsError(true);
      setLoading(false)
      setResponseMessage("an error occured please try later");
      setOpen(true)
    }
  };

  console.log('password reset', responseMessage)

  console.log('This is the response Data', metaTransactionId)


  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Verify Payments Command
          </h2>
          <div>
            <Popover title="Verify Payment Command">
              <h3 className="font-semibold text-lg mb-2">
                /verify Command
              </h3>
              <p>
                <strong>Purpose:</strong> Verifies the status of a Payment
                transaction using the pub key and the transaction uuid
              </p>
              <p>
                <strong>Parameters:</strong>
                <ul>
                  <li>
                    <strong>Publication Key:</strong> The user's Publication Key.
                  </li>
                  <li>
                    <strong>Transaction Id:</strong> The transaction Id of the payment to verify.
                  </li>
                </ul>
              </p>
              <p>
                <strong>Functionality:</strong> Allows administrators to verify the status of a transaction
              </p>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="publication_key"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Publication Key
            </label>
            <input
              type="text"
              id="publication_key"
              value={publicationKey}
              onChange={handlePublicationChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Provide Publication Key"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Transaction uuid
            </label>
            <input
              type="text"
              id="transaction_uuid"
              value={transactionId}
              onChange={handleTransactionChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Provide Transaction uuid"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              CallBack Url
            </label>
            <input
              type="text"
              id="transaction_id"
              value={callBackUrl}
              onChange={handleCallBackUrlChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Provide Call Back Url"
            />
          </div>
        </div>

        <div className="my-6 text-center">
          {/* <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Reset Password
          </button> */}

          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>
        {!isError && responseMessage && <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Verify Payments"
          actionItems={true} actionItemText="Reconcile Payments" actionItemMethod={showReconcileModal}>
          {!isError && (<ResponseCard entityKey={Object.keys(responseMessage).map((val) => val.replaceAll("_", " ")) || null} entityValue={Object.values(responseMessage).map((val) => val?.toString().replaceAll("_", " ")) || null} headerA='Title' headerB='Values' />)}
        </Modal>}

        {showReconcillationModal && <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Reconcile Payments" className="md:w-[45%]"
        >
          <h1 className="text-center font-medium text-xl text-blue-400 font-sans">Are you sure you want to Reconcile Payments??</h1>
          <div className=" flex justify-center gap-5">
            <div>
              <Button handleSubmit={ReconcilePayments} loading={loading} buttonName="Confirm"
                className="w-full px-4 py-2 bg-blue-700 text-white text-nowrap rounded-md hover:bg-blue-700 uppercase"
              />
            </div>
            <div>
              <Button handleSubmit={onClick} loading={loading} buttonName="Cancel"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-blue-700 uppercase" />
            </div>
          </div>
        </Modal>}
        {isError && responseMessage &&
          <Modal onClick={onClick} setOpen={setOpen} open={open} modalHead="Verify Payments">
            <div
              className="my-4 p-4 border rounded-md text-lg text-center bg-white text-red-800 border-slate-300">
              <span className="font-semibold">
                {isError && `Sorry ${responseMessage}`}
              </span>
            </div>

          </Modal>
        }
        {loading && (<ImageLoader />)}
      </div>
    </div>
  );
};

export default VerifyPayments;
