import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";

// Function to update maintenance data
export const updateMaintenanceData = async (
  docVersionName: string,
  docVersionId: string,
  updatedApp: { versionName: string; appState: any },
  setData: (val: any) => void
) => {
  if (!updatedApp) return;

  setData((prev: any) => ({
    ...prev,
    loading: true,
    open: false,
    actionItem: false,
    responseMessage: "",
  }));

  try {
    await updateDoc(doc(db, docVersionName, docVersionId), {
      [updatedApp.versionName]: updatedApp.appState,
    });

    setData((prev: any) => ({
      ...prev,
      responseMessage: `You have successfully updated maintenance mode for ${updatedApp.versionName}`,
      open: true,
      loading: false,
    }));
  } catch (error) {
    setData((prev: any) => ({
      ...prev,
      open: true,
      loading: false,
      responseMessage: "An error occurred while updating maintenance data",
    }));
  }
};

// Function to update a specific version

export const updateVersion = async (
  docVersionName: string,
  docVersionId: string,
  payloadObject: Record<string, any>,
  setData: (val: any) => any,
  versionNumber: number,
  versionName: string,
  setOfflineVersion: (val: any) => any
) => {
  try {
    const docRef = doc(db, docVersionName, docVersionId);
    const updateSpecficVersion = await updateDoc(docRef, { ...payloadObject });
    console.log("updateDoc s", updateSpecficVersion);
    let message = `You have successfully updated version number ${versionNumber} for ${versionName} mobile app`;
    setData((prevData: any) => ({
      ...prevData,
      responseMessage: message,
      open: true,
      loading: false,
      isError: false,
    }));
    setOfflineVersion((offline: any) => [...offline, Number(versionNumber)]);
  } catch (error: any) {
    console.error("Error updating document:", error);
    setData((prevData: any) => ({
      ...prevData,
      responseMessage: JSON.stringify(error.message),
      isError: false,
      open: true,
      loading: false,
    }));
    return;
  }
};
