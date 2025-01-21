"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Loader2 } from "lucide-react"
import Image from "next/image"
import { loginUser } from "./actions/auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function LoginPage() {
  const [error, setError] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setError("")

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      setError("All fields are required")
      return
    }

    startTransition(async () => {
      const result = await loginUser(formData)

      if (result.error) {
        setError(result.error)
        toast.error(result.error)
        return
      }

      if (result.success) {
        toast.success("Login successful!")
        router.push("/home")
      }
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 bg-[#0B0B14] bg-gradient-to-br from-[#0B0B14] to-[#1a1a2e]">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white shadow-xl rounded-xl p-8 space-y-8">
            <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(new FormData(e.currentTarget))
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full p-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[#8B5CF6] focus:ring-0 transition-colors placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full p-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[#8B5CF6] focus:ring-0 transition-colors placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Keep me logged in
                  </label>
                </div>
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-3 rounded-lg transition-all duration-200"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Logo */}
      <div className="hidden lg:flex lg:flex-1 bg-[#0B0B14] items-center justify-center p-8">
        <div className="text-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Dark-A9P5ErIaCRgbho2l8PJnyOUeGgc7n2.webp"
            alt="Haktrak Networks"
            width={400}
            height={120}
            priority
            className="w-auto h-auto object-contain mb-6"
          />
          <p className="text-gray-400 text-lg">Actionable Intelligence Against Cyber Threats</p>
        </div>
      </div>
    </div>
  )
}

