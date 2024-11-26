"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import useAutoLogout from "@/lib/hooks/useAutoLogout";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase.config";
import ImageLoader from "../Loader/Loader";


function DefaultLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setCallbackUrl } = useAutoLogout();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLocalStorageEmpty = localStorage.length === 0;

    if (isLocalStorageEmpty) {
      router.push("/signin");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/signin");
      } else {
        setCallbackUrl(window.location.pathname);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, setCallbackUrl])

  if (isLoading) {
    return <ImageLoader />;
  }
  return (
    <div className="min-h-screen bg-white  overflow-hidden">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-full w-64 bg-white hidden md:flex flex-col z-40">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ml-0 md:ml-64">
          {/* Header */}
          <Header />

          {/* Content Area */}
          <div className="bg-[#FAFAFA] md:px-6 pt-3 pb-10 min-h-screen mt-[50.5px] ">
            <div className="w-full mx-auto px-4 md:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DefaultLayout;
