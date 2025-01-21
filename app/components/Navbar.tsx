"use client"

import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="bg-[#0B0B14] border-b border-[#1a1a2e] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/logo-dark.webp"
            alt="Haktrak Networks"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#1a1a2e]">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#1a1a2e]">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#1a1a2e] border-[#2a2a3e] text-white">
              <DropdownMenuItem>
                <Link href="/change-password" className="w-full">
                  Change Password
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

