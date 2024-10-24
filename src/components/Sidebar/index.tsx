'use client'

import { useState, useCallback, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { RiHome5Line, RiSlackFill } from 'react-icons/ri'
import { TbDeviceHeartMonitor } from 'react-icons/tb'
import { FiUserX } from 'react-icons/fi'
import { MdExpandMore } from 'react-icons/md'

interface MenuItem {
  name: string
  icon: React.ReactNode
  route: string
  subItems?: string[]
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: <RiHome5Line className="text-lg" />,
    route: "/",
  },
  {
    name: "Slack Commands",
    icon: <RiSlackFill className="text-lg" />,
    route: "/slack",
  },
  {
    name: "USSD Monitor",
    icon: <TbDeviceHeartMonitor className="text-lg" />,
    route: "/ussd-monitor",
  },
  {
    name: "Non Member",
    icon: <FiUserX className="text-lg" />,
    route: "/non-member",
  },
]

const SideBarItem = ({ item, isActive, onToggle }: { item: MenuItem; isActive: boolean; onToggle: () => void }) => {
  return (
    <li className="py-1">
      <Link href={item.route} passHref>
        <button
          onClick={onToggle}
          className={`flex items-center justify-between w-full px-4 py-3 
          hover:bg-blue-100 transition-colors duration-200 rounded-lg ${
            isActive ? "bg-blue-900 text-white hover:bg-blue-800" : "bg-white text-gray-900"
          }`}
        >
          <div className="flex items-center">
            {item.icon}
            <p className="ml-2">{item.name}</p>
          </div>
          {item.subItems && (
            <span className="ml-2 w-4 h-4 flex justify-center rounded-[50%] bg-pink-100">
              <MdExpandMore className="text-lg text-blue-400" />
            </span>
          )}
        </button>
      </Link>
      {item.subItems && (
        <ul className="pl-12 list-none cursor-pointer">
          {item.subItems.map((subItem) => (
            <li key={subItem} className="py-1 text-sm text-right hover:bg-blue-200 rounded-lg">
              {subItem}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default function SideBar() {
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  const handleDropdownToggle = useCallback((name: string) => {
    setDropdownOpen(prev => prev === name ? null : name)
  }, [])

  const memoizedMenuItems = useMemo(() => menuItems, [])

  return (
    <>
      <div className="bg-blue-900 w-full h-[50px] flex justify-center">
        <Image
          src="/logo.png"
          alt="Asoriba Logo"
          width={150}
          height={50}
          className="h-[50px] w-auto"
        />
      </div>
      <nav className="w-full bg-white flex flex-col px-5 h-screen p-5">
        <ul className="flex-grow">
          {memoizedMenuItems.map((item) => (
            <SideBarItem
              key={item.route}
              item={item}
              isActive={pathname === item.route}
              onToggle={() => handleDropdownToggle(item.name)}
            />
          ))}
        </ul>
      </nav>
    </>
  )
}