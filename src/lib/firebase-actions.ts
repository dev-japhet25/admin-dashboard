import { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase.config";
import { doc, getDoc,updateDoc } from "firebase/firestore";


interface MaintenanceProps {
  versionName: string;
  appState: boolean;
}

interface VersionProps {
  versionName: string;
  versionNumber: number;
}
interface MaintenanceProps {
  versionName: string;
  appState: boolean;
}

export const FetchDataMaintenance = (
  docMaintenanceName: string,
  docMaintenanceId: string
) => {
  const [mobileVersion, setMobileVersion] = useState<MaintenanceProps[]>([]);

  const readMaintenanceData = useCallback(async () => {
    if (!docMaintenanceName || !docMaintenanceId) return;

    try {
      const docRef = doc(db, docMaintenanceName, docMaintenanceId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());

        const versionsArray: MaintenanceProps[] = Object.entries(docSnap.data())
          .filter(([_, value]) => typeof value === "boolean")
          .map(([versionName, appState]) => ({ versionName, appState }));

        setMobileVersion(versionsArray);
      }
    } catch (error) {
      console.error("Error reading document:", error);
    }
  }, [docMaintenanceName, docMaintenanceId]);

  useEffect(() => {
    console.log("Fetching maintenance data");
    readMaintenanceData();
  }, [readMaintenanceData]);

  return { mobileVersion, setMobileVersion }; // Return fetched data if needed
};

export const FetchDataVersion = (
  docVersionName: string,
  docVersionId: string
) => {
  const [mobileVersion, setMobileVersion] = useState<VersionProps[]>([]);
  const [offlineVersions, setOfflineVersion] = useState<number[]>([]);

  const readVersionsData = useCallback(async () => {
    try {
      const docRef = doc(db, docVersionName, docVersionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());

        const versionsArray = Object.entries(docSnap.data()).map(
          ([versionName, versionNumber]) => ({
            versionName,
            versionNumber: Number(versionNumber), // Ensures numbers are properly formatted
          })
        );

        setMobileVersion(versionsArray);
        setOfflineVersion(versionsArray.map((v) => v.versionNumber));
      }
    } catch (error) {
      console.error("Error reading document:", error);
    }
  }, [docVersionName, docVersionId]);

  useEffect(() => {
    console.log("Fetching version data");
    readVersionsData();
  }, [readVersionsData]);

  return {
    mobileVersion,
    offlineVersions,
    setMobileVersion,
    setOfflineVersion,
  }; // Return fetched data if needed
};




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

