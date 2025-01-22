"use client"

import { useEffect } from "react"
import { useApi } from "../contexts/ApiContext"
import { useRouter } from "next/navigation"

export function SessionCheck() {
  const { checkSession } = useApi()
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      checkSession()
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [checkSession])

  return null
}

