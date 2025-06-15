import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("aee");

    const payload = new URLSearchParams({
      refresh_token: process.env.Z_REFRESH_TOKEN,
      client_id: process.env.Z_CLIENT_ID,
      client_secret: process.env.Z_CLIENT_SECRET,
      redirect_uri: "https://google.com/",
      grant_type: "refresh_token",
    });

    const response = await fetch(
      "https://accounts.zoho.com.au/oauth/v2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    console.log("[+] Access Token Retrieved");
    return NextResponse.json({ access_token: data.access_token });
  } catch (error) {
    console.error("[-] Failed to retrieve access token", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
