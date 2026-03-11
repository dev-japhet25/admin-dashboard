"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, UserX,Phone } from "lucide-react";
import Link from "next/link";
import { RiSlackFill } from 'react-icons/ri';
import { TbDeviceHeartMonitor } from 'react-icons/tb';



const Dashboard = () => {
  
  const dashboardItems = [
    {
      title: "Dashboard",
      description:
        "Overview of all system activities and key metrics at a glance.",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Slack Commands",
      description:
        "Manage and monitor custom Slack commands for improved team communication.",
      icon: RiSlackFill,
      href: "/slack",
    },
 {
      title: "Mobile Commands",
      description:
        "Manage mobile app updates",
      icon: Phone,
      href: "/mobile-app",
    },
    {
      title: "USSD Monitor",
      description:
        "Track and analyze Unstructured Supplementary Service Data (USSD) interactions.",
      icon: TbDeviceHeartMonitor,
      href: "/ussd-monitor",
    },
    {
      title: "Non Member",
      description:
        "Manage access and interactions for non-member users in the system.",
      icon: UserX,
      href: "/non-member",
    },
  ];

  return (
    <DefaultLayout>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {dashboardItems.map((item, index) => (
            <Link href={item.href} key={index} className="block">
              <Card className="h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer border-2 hover:border-primary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold text-primary">
                    {item.title}
                  </CardTitle>
                  <div className="p-2 bg-blue-900 rounded-full">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>{" "}
    </DefaultLayout>
  );
};

export default Dashboard;