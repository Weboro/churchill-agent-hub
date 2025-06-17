import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get("agentId");

  // Validate agentId
  if (!agentId?.trim()) {
    return NextResponse.json(
      { error: "Agent ID is required" },
      { status: 400 }
    );
  }

  let access_token = "";

  // Step 1: Fetch access token
  try {
    const payload = new URLSearchParams({
      refresh_token: process.env.Z_REFRESH_TOKEN || "",
      client_id: process.env.Z_CLIENT_ID || "",
      client_secret: process.env.Z_CLIENT_SECRET || "",
      redirect_uri: "https://google.com/",
      grant_type: "refresh_token",
    });

    const tokenResponse = await fetch(
      "https://accounts.zoho.com.au/oauth/v2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Token fetch error:", tokenData);
      return NextResponse.json(
        { error: `Token fetch failed: ${tokenData?.error || "Unknown error"}` },
        { status: tokenResponse.status }
      );
    }

    access_token = tokenData?.access_token;

    if (!access_token) {
      return NextResponse.json(
        { error: "No access token found" },
        { status: 500 }
      );
    }

    console.log("[+] Access Token Retrieved:", access_token);
  } catch (error) {
    console.error("[-] Failed to retrieve access token:", error);
    return NextResponse.json(
      { error: `Token fetch error: ${(error as Error).message}` },
      { status: 500 }
    );
  }

  // Step 2: Query Zoho CRM API
  try {
    const criteria = `(IIE_Agent_Id:equals:${encodeURIComponent(agentId)})`;
    const url = `https://www.zohoapis.com.au/crm/v8/Accounts/search?criteria=${encodeURIComponent(
      criteria
    )}`;

    console.log("Zoho API URL:", url);

    const zohoResponse = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
        Accept: "application/json",
      },
    });

    const data = await zohoResponse.json();

    if (!zohoResponse.ok) {
      console.error("Zoho API error:", data);
      return NextResponse.json(
        {
          error: `Zoho API error: ${data?.code || "Unknown"} - ${
            data?.message || "No message"
          }`,
        },
        { status: zohoResponse.status }
      );
    }

    console.log("[+] Zoho API response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[-] Zoho fetch error:", error);
    return NextResponse.json(
      { error: `Zoho fetch error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
