import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import handleLogout from "../helpers/logout";

const AUTO_LOGOUT_TIME = 10 * 60 * 1000; // 10 minutes
const AUTO_CHECK_INTERVAL = 3 * 60 * 1000; // 3 minutes

const useAutoLogout = () => {
  const router = useRouter();
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const intervalId = setInterval(checkLogout, AUTO_CHECK_INTERVAL);

    const activityDetector = () => {
      setLastActivity(Date.now());
    };

    document.addEventListener("mousemove", activityDetector);
    document.addEventListener("keydown", activityDetector);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("mousemove", activityDetector);
      document.removeEventListener("keydown", activityDetector);
    };
  }, [lastActivity]);

  const checkLogout = () => {
    console.log("Checking logout...");
    const currentTime = Date.now();
    const timeDiff = currentTime - lastActivity;
    if (timeDiff >= AUTO_LOGOUT_TIME) {
      logUserOut();
    }
  };

  const logUserOut = async () => {
    try {
    console.log("Logging out...");
      handleLogout({
        router: router,
        callbackUrl: callbackUrl,
    });
    } catch (error) {
      console.error(error);
    }
  };

  return { setCallbackUrl };
};

export default useAutoLogout;

export const clearLocalStorage = () => {
    localStorage.clear();
};
