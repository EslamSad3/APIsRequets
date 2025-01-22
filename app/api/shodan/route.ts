import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.shodan.io/shodan/host/${encodeURIComponent(query)}?key=${process.env.SHODAN_API_KEY}`,
    )

    if (!response.ok) {
      console.error("Shodan API error:", await response.text())
      return NextResponse.json({ error: "Shodan API request failed" }, { status: response.status })
    }

    const data = await response.json()
    const shodanResult = {
      city: data.city,
      country_name: data.country_name,
      ip: data.ip_str,
      isp: data.isp,
      ports: data.ports,
      vulns: data.vulns,
      last_update: data.last_update,
      domains: data.domains,
    }

    return NextResponse.json({ shodanResult })
  } catch (error) {
    console.error("Shodan search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

