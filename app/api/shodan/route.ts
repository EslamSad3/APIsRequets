import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const apiKey = process.env.SHODAN_API_KEY
    if (!apiKey) {
      console.error("Shodan API key is missing")
      return NextResponse.json({ error: "Shodan API key is not configured" }, { status: 500 })
    }

    const response = await fetch(`https://api.shodan.io/shodan/host/${encodeURIComponent(query)}?key=${apiKey}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Shodan API error:", response.status, errorText)
      return NextResponse.json(
        { error: `Shodan API request failed: ${response.status} ${errorText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("Shodan API response:", JSON.stringify(data, null, 2))

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

