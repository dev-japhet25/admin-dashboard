
import { useEffect,useState,useCallback} from "react";
import { db } from "../../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

interface MaintenanceProps {
    versionName : string,
     appState : boolean
   }


   interface VersionProps {
    versionName : string ,
    versionNumber : number 
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
   
     return {mobileVersion,setMobileVersion } // Return fetched data if needed
   };
   

   export const FetchDataVersion = (docVersionName: string, docVersionId: string) => {
    const [mobileVersion, setMobileVersion] = useState<VersionProps[]>([]);
    const [offlineVersions, setOfflineVersion] = useState<number[]>([]);
  
    const readVersionsData = useCallback(async () => {
      try {
        const docRef = doc(db, docVersionName, docVersionId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log("Document Data:", docSnap.data());
  
          const versionsArray = Object.entries(docSnap.data()).map(([versionName, versionNumber]) => ({
            versionName,
            versionNumber: Number(versionNumber), // Ensures numbers are properly formatted
          }));
  
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
  
    return { mobileVersion, offlineVersions,setMobileVersion,setOfflineVersion }; // Return fetched data if needed
  };