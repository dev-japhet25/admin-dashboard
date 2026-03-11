import Popover from "@/components/Popover";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/Modal/Modal";
import ImageLoader from "@/components/Loader/Loader";
import {formatDataMaintenance} from "@/lib/helpers/format";
import { FetchDataMaintenance } from "@/lib/hooks/fetchData";
import { updateMaintenanceData } from "@/lib/hooks/updateData";

const AppMaintenance = () => {
  const  {mobileVersion,setMobileVersion} = FetchDataMaintenance("maintenance","TyyHnOOoBdKRQ6sZdLjs")   
       const [data,setData] = useState({
         loading : false,
         isError : false,
         open : false,
         responseMessage : "",
         actionItem : false,
         toggleIndex : "",
         toggleField : ""
       })

   function onClick() {
    console.log(' I have closed')
    setData((prevData) => ({...prevData,open : false,responseMessage : ""}))
    return;
  }




const TriggerToggleNotification = async (index : any, field :string) => {
  setMobileVersion((prevVersions) => {
    const newVersions = [...prevVersions];

    // Get the previous state of the specific app
    const prevState = newVersions[index].appState;
    const newState = !prevState;

    // Only update if appState actually changes
    if (prevState === newState) {
      console.log("No changes detected, skipping update.");
      return prevVersions; // No change, return previous state
    }

    // Toggle the state
    newVersions[index] = { ...newVersions[index], [field]: newState };

    // Call updateMaintenanceData immediately after updating state
     updateMaintenanceData("maintenance", "TyyHnOOoBdKRQ6sZdLjs", newVersions[index], setData);

    return newVersions;
  });
};



const handleToggleChange = (index :any, field:string,versionName :string) => {
   const getToggleAppOldState = mobileVersion[index].appState;
   const switchOldState = getToggleAppOldState ? "On" : "Off";
   const switchNewState = !getToggleAppOldState ? "On" : "Off";
  const responseMessage = `You are about to switch maintenance mode from ${switchOldState}  to ${switchNewState}
  for the ${versionName} app`;
  setData((prevData)=>({...prevData,
    responseMessage: responseMessage ,
    open :true,
    actionItem:true,
   toggleField : field,
   toggleIndex : index}))
 console.log('setToggleIndex mobile ',mobileVersion)
};

console.log('mobile versions',mobileVersion,data)
  return (
    <div className="flex justify-center w-full">
      <div className="w-full">
        <div className="flex justify-between me-36">
          <h2 className="text-xl font-semibold text-gray-900 text-center mx-5">
            App Maintenance Command
          </h2>
          <div>
            <Popover title="Version Updates Command">
              <h3 className="font-semibold text-lg mb-2">
                App Maintenance Command
              </h3>
              <p>
                <strong>Purpose:</strong> mobile app maintenance
              </p>
              <p>
                <strong>Parameters:</strong>
                <ul>
                  <li>
                    <strong>App State:</strong> Toggle the mobile maintainance from on to off Command vice versa.
                  </li>

                </ul>
              </p>

            </Popover>
          </div>
        </div>

<div className="flex flex-col md:flex-row justify-start flex-wrap p-4 gap-x-2 gap-y-6 w-full">
  {mobileVersion.length === 0 && <ImageLoader />}

  {mobileVersion.map((app, index) => {
    const { title, description }: any = formatDataMaintenance(app?.versionName) || {};
    return (
    <div
      key={index}
      className="border p-4 rounded-lg shadow-md bg-blue-50 w-full md:w-[24%] flex flex-col justify-between"
    >
      {/* App Name & Toggle in One Row */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-md font-semibold text-blue-700 capitalise">{title}</h2>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={app.appState}
            onChange={() => handleToggleChange(index, "appState",app.versionName)}
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative transition-colors">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white border border-gray-300 rounded-full transition-all duration-300 peer-checked:translate-x-6"></div>
          </div>
        </label>
      </div>

      {/* App Description on Next Row */}
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
)})}
</div>



        {data.responseMessage && <Modal onClick={onClick} setOpen={(open) => setData((prevData) => ({ ...prevData, open }))} open={data.open} modalHead="App Maintenance"
          actionItems={data.actionItem} actionItemText="Continue" actionItemMethod={()=>TriggerToggleNotification(data.toggleIndex,data.toggleField)}>
          {(
               <div
              className="my-4 p-4 border rounded-md text-md text-center bg-white text-red-500 border-slate-300">
              <span className="font-semibold">
                 {data.responseMessage}
              </span>
            </div>)}
           
        </Modal>}


        {data.loading && (<ImageLoader />)}
      </div>
    </div>
  );
};

export default AppMaintenance;