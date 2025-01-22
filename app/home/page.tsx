"use client"

import { useState } from "react"
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
import { useApi } from "../contexts/ApiContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { search, searchResults, isSearching } = useApi()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      await search(searchQuery)
    }
  }

  return (
    <div className="flex h-screen bg-[#0B0B14] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-4">Welcome to Haktrak Networks</h1>
          <p className="text-gray-300 mb-6">
            Your AI-powered eXtended Cyber Intelligence (XCI) Platform designed to protect against cyber threats with
            actionable and contextualized intelligence.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="Enter domain or IP address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-[#1a1a2e] border-[#2a2a3e] text-white"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </form>

          {searchResults && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Search Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">LeakIX Results</h3>
                  <pre className="bg-[#1a1a2e] p-4 rounded-lg overflow-auto max-h-[600px]">
                    {JSON.stringify(searchResults.leakixResult, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Shodan Results</h3>
                  <pre className="bg-[#1a1a2e] p-4 rounded-lg overflow-auto max-h-[600px]">
                    {JSON.stringify(searchResults.shodanResult, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

