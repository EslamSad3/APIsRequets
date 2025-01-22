import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"
import { Toaster } from "react-hot-toast"
import { ApiProvider } from "./contexts/ApiContext"
import { SessionCheck } from "./components/SessionCheck"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Haktrak Networks Login",
  description: "Login to Haktrak Networks XCI Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ApiProvider>
            <SessionCheck />
            {children}
            <Toaster position="top-right" />
          </ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

