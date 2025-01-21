import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"

export default function HomePage() {
  return (
    <div className="flex h-screen bg-[#0B0B14] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to Haktrak Networks</h1>
          <p className="text-gray-300">
            Your AI-powered eXtended Cyber Intelligence (XCI) Platform designed to protect against cyber threats with
            actionable and contextualized intelligence.
          </p>
        </main>
      </div>
    </div>
  )
}

