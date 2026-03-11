import { doc,updateDoc, } from "firebase/firestore";
import { db } from "../../../firebase.config";



 export const updateMaintenanceData = async (
   docVersionName: string,
   docVersionId: string,
   updatedApp : any,
   setData : (val: any) => any
  ) => {
  if (!updatedApp) return; // Prevent unnecessary API calls

  console.log("Push this data:", updatedApp);
  // Show loading before making the API call
    setData((prevData :any) => ({ ...prevData, 
      loading: true,
      open: false,
      actionItem: false,
      responseMessage: ""}));

  try {
    const docRef = doc(db,docVersionName, docVersionId);

    // Prepare the update object
    const updateData = { [updatedApp.versionName]: updatedApp.appState };
    await updateDoc(docRef, updateData);
    console.log("Document successfully updated:", updateData);
    // Set success response & actionItem only if API call was successful
     setData((prevData: any) => ({ ...prevData,
       responseMessage: `You have updated maintenance mode for the ${updatedApp.versionName} app`
       ,open: true ,
      actionItem : false ,
    loading : false}));
    } catch (error) {
    console.error("Error updating maintenance data:", error);
    // Set error response & actionItem only if API call failed
    setData((prevData : any) => ({ ...prevData, 
      open: true,
       loading: false,
       actionItem : false,
      responseMessage : "Sorry, an error occurred"
     }));
  }

};




export const updateVersion  = async (
  docVersionName: string,
  docVersionId: string,
  payloadObject : Record<string,any>,
  setData : (val: any) => any,
  versionNumber : number,
  versionName : string,
   setOfflineVersion : (val :any) => any) => {
    try {     
             const docRef = doc(db, docVersionName,docVersionId);
             const updateSpecficVersion =  await updateDoc(docRef, {...payloadObject});
             console.log('updateDoc s',updateSpecficVersion)
               let message = `You have successfully updated version number ${versionNumber} for ${versionName} mobile app`
                 setData((prevData :any) => ({...prevData,
                  responseMessage : message , open : true,loading : false ,isError : false}))
                 setOfflineVersion((offline:any)=> [...offline,Number(versionNumber)])
           }
       catch(error: any){
        console.error("Error updating document:", error);
         setData((prevData :any) => ({...prevData,
          responseMessage : JSON.stringify(error.message),
          isError : false,
          open : true,
          loading : false})) 
        return;  
           }
}