import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    // LeakIX API request
    const leakixResponse = await fetch(`https://leakix.net/domain/${encodeURIComponent(query)}`, {
      headers: {
        "api-key": process.env.LEAKIX_API_KEY || "",
        Accept: "application/json",
      },
    })

    // Shodan API request
    const shodanResponse = await fetch(
      `https://api.shodan.io/shodan/host/${encodeURIComponent(query)}?key=${process.env.SHODAN_API_KEY}`,
    )

    let leakixResult = null
    let shodanResult = null

    if (leakixResponse.ok) {
      leakixResult = await leakixResponse.json()
    } else {
      console.error("LeakIX API error:", await leakixResponse.text())
    }

    if (shodanResponse.ok) {
      shodanResult = await shodanResponse.json()
    } else {
      console.error("Shodan API error:", await shodanResponse.text())
    }

    return NextResponse.json({
      leakixResult,
      shodanResult,
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

