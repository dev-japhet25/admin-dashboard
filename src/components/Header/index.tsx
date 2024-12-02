"use client";

import { Button } from "@/components/ui/button";
import handleLogout from "@/lib/helpers/logout";
import { useState } from "react";
import { MdOutlineSubject } from "react-icons/md";
import SideBar from "../Sidebar";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [isDrawerOpen, setDrawerOpen] = useState(false);


  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="fixed bg-blue-900 w-full h-[50px] mx-auto z-50">
        <div className="flex justify-between items-center px-6 h-full">
          {/* Mobile - Icon to trigger the drawer (visible only on small screens) */}
          <div
            className="md:hidden flex items-center cursor-pointer text-white"
            onClick={toggleDrawer}
          >
            <MdOutlineSubject className="text-3xl" />
          </div>

          {/* Logout button (visible on all screen sizes) */}
          <div className="flex justify-end md:ml-[55%] lg:ml-[65%] xl:ml-[75%]">
            <Button
              onClick={() => handleLogout({router:router, callbackUrl:"/slack"})}
              variant="secondary"
              className="bg-white text-blue-700 hover:bg-blue-100"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Side drawer component */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 md:hidden"
          onClick={toggleDrawer}
        >
          <div
            className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <SideBar />
          </div>
        </div>
      )}
    </>
  );
}
