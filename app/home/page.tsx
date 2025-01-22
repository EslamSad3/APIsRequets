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
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (searchQuery.trim()) {
      try {
        await search(searchQuery)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred during the search")
      }
    }
  }

  const isDomain = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/i.test(searchQuery)

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

          {error && <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          {searchResults && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Search Results</h2>
              {isDomain && searchResults.leakixResult && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">LeakIX Results</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {/* Table headers */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Host
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Port
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Protocol
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subdomains
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Summary
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Array.isArray(searchResults.leakixResult) ? (
                        searchResults.leakixResult.map((result, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{result.host}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{result.port}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{result.protocol}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {result.subdomains && result.subdomains.join(", ")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{result.summary}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">{searchResults.leakixResult.host}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{searchResults.leakixResult.port}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{searchResults.leakixResult.protocol}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {searchResults.leakixResult.subdomains && searchResults.leakixResult.subdomains.join(", ")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{searchResults.leakixResult.summary}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              {!isDomain && searchResults.shodanResult && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Shodan Results</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          City
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          IP
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ISP
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ports
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vulns
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Update
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Domains
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">{searchResults.shodanResult.city}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{searchResults.shodanResult.country_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{searchResults.shodanResult.ip}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{searchResults.shodanResult.isp}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {searchResults.shodanResult.ports && searchResults.shodanResult.ports.join(", ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {searchResults.shodanResult.vulns && searchResults.shodanResult.vulns.join(", ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{searchResults.shodanResult.last_update}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {searchResults.shodanResult.domains && searchResults.shodanResult.domains.join(", ")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

