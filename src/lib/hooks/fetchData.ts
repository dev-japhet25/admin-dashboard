
import { useEffect,useState,useCallback} from "react";
import { db } from "../../../firebase.config";
import { doc, getDoc,updateDoc } from "firebase/firestore";

interface MaintenanceProps {
    versionName : string,
     appState : boolean
   }


   interface VersionProps {
    versionName : string ,
    versionNumber : number 
   }

export const FetchDataMaintenance = ( docMaintenanceName: string , docMaintenanceId: string) => {
       const [mobileVersion,setMobileVersion] = useState<MaintenanceProps[]>([])


    const readMaintenanceData = useCallback(async () => {
      try {  
        const docRef = doc(db,docMaintenanceName, docMaintenanceId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          console.log("Document Data:", docSnap.data());
    
          const versionsArray : any[] = []
          Object.entries(docSnap.data()).forEach(([verName, verNumber]) => {
         if (typeof verNumber === 'boolean') {
             versionsArray.push({
                 versionName: verName,
                 appState: verNumber
             });
         }
     });
          setMobileVersion(versionsArray);
        }
      } catch (error) {
        console.error("Error reading document:", error);
      }
    },[]);
    
    useEffect(() => {
      console.log("Component mounted or re-rendered");
      console.log('my mobile versions',mobileVersion,open)
      readMaintenanceData();
    }, [readMaintenanceData]);


    return {mobileVersion,setMobileVersion};
}



export const FetchDataVersion = (docVersionName : string, docVersionId :string) => {
const [mobileVersion,setMobileVersion] = useState<VersionProps[]>([])
     const [offlineVersions,setOfflineVersion] = useState<number[]>([])
// Call the function

useEffect(() => {
  let isMounted = true; // To prevent state updates if the component unmounts

  const readVersionsData = async () => {
    try {
      const docRef = doc(db, docVersionName, docVersionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && isMounted) {
        console.log("Document Data:", docSnap.data());

        const versionsArray = Object.entries(docSnap.data()).map(([verName, verNumber]) => ({
          versionName: verName,
          versionNumber: verNumber
        }));

        const offlineArray = versionsArray.map(v => v.versionNumber);

        setMobileVersion(versionsArray);
        setOfflineVersion(offlineArray);
      }
    } catch (error) {
      console.error("Error reading document:", error);
    }
  };

  readVersionsData();

  return () => {
    isMounted = false; 
    setMobileVersion([]); 
    setOfflineVersion([]);
  };
}, []);

    return {mobileVersion,offlineVersions,setMobileVersion,setOfflineVersion};
}
