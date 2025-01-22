import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://leakix.net/domain/${encodeURIComponent(query)}`, {
      headers: {
        "api-key": process.env.LEAKIX_API_KEY || "",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      console.error("LeakIX API error:", await response.text())
      return NextResponse.json({ error: "LeakIX API request failed" }, { status: response.status })
    }

    const data = await response.json()
    const leaks = data.Leaks || []
    const services = data.Services || []

    const leakixResult = leaks.length > 0 ? leaks : services

    return NextResponse.json({ leakixResult })
  } catch (error) {
    console.error("LeakIX search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

