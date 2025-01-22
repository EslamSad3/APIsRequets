"use client"

import type React from "react"
import { createContext, useContext, type ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface SearchResult {
  leakixResult: any
  shodanResult: any
}

interface ApiContextType {
  login: (email: string, password: string, keepLoggedIn: boolean) => Promise<void>
  logout: () => Promise<void>
  checkSession: () => Promise<void>
  search: (query: string) => Promise<void>
  searchResults: SearchResult | null
  isSearching: boolean
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

export const useApi = () => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider")
  }
  return context
}

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const login = async (email: string, password: string, keepLoggedIn: boolean) => {
    try {
      const response = await fetch(
        "https://apirendertest.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, keepLoggedIn }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials")
      }

      const data = await response.json()

      const expirationTime = keepLoggedIn ? 7 * 24 * 60 * 60 : 24 * 60 * 60 // 7 days or 24 hours
      document.cookie = `auth-token=${data.token}; path=/; max-age=${expirationTime}; SameSite=Strict; Secure`

      toast.success("Login successful!")
      router.push("/home")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred during login")
    }
  }

  const logout = async () => {
    try {
      document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      toast.success("Logged out successfully")
      router.push("/")
    } catch (error) {
      toast.error("An error occurred during logout")
    }
  }

  const checkSession = async () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")
    if (!token) {
      logout()
      return
    }
  }

  const search = async (query: string) => {
    setIsSearching(true)
    setSearchResults(null)

    try {
      // LeakIX API request
      const leakixResponse = await fetch(
        `https://leakix.net/domain/${encodeURIComponent(query)}`,
        {
          headers: {
            "api-key": process.env.LEAKIX_API_KEY || "",
            Accept: "application/json",
            " Access-Control-Allow-Origin": "*",
          },
        }
      );

      // Shodan API request
      const shodanResponse = await fetch(
        `https://api.shodan.io/shodan/host/${encodeURIComponent(query)}?key=${process.env.SHODAN_API_KEY}`,
      )

      if (!leakixResponse.ok && !shodanResponse.ok) {
        throw new Error("Both API requests failed")
      }

      let leakixResult = null
      let shodanResult = null

      try {
        leakixResult = await leakixResponse.json()
      } catch (e) {
        console.error("LeakIX API error:", e)
      }

      try {
        shodanResult = await shodanResponse.json()
      } catch (e) {
        console.error("Shodan API error:", e)
      }

      setSearchResults({
        leakixResult,
        shodanResult,
      })
    } catch (error) {
      toast.error("An error occurred during the search")
      console.error(error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <ApiContext.Provider value={{ login, logout, checkSession, search, searchResults, isSearching }}>
      {children}
    </ApiContext.Provider>
  )
}

