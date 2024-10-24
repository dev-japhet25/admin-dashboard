import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { auth } from "../../../firebase.config";
import { useState } from "react";

type LogoutProps = {
  router: any;
  callbackUrl?: string;
};

const handleLogout = async ({ router, callbackUrl }: LogoutProps) => {
  try {
    await signOut(auth);
    localStorage.removeItem("userCommands");
    if (callbackUrl) {
      router.push(`/signin?callbackUrl=${callbackUrl}`);
    } else {
      router.push("/signin");
    }
    localStorage.clear();
    toast.success("Logged out successfully!");
  } catch (error) {
    toast.error(`Error logging out:${error}`);
  }
};

export default handleLogout;
