"use client"

import { Button } from "@/components/ui/button"
import { Home, Shield, BarChart, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useApi } from "../contexts/ApiContext"
import toast from "react-hot-toast"

export function Sidebar() {
  const router = useRouter()
  const { logout } = useApi()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <aside className="bg-[#0B0B14] border-r border-[#1a1a2e] w-64 h-screen flex flex-col">
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/home" passHref>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#1a1a2e]"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/threats" passHref>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#1a1a2e]"
              >
                <Shield className="mr-2 h-4 w-4" />
                Threats
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/analytics" passHref>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#1a1a2e]"
              >
                <BarChart className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/settings" passHref>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#1a1a2e]"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}

