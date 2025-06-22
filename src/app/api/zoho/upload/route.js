import { NextResponse } from "next/server";
import Certificate from "@/components/certificate/Certificate";
import { renderToBuffer } from "@react-pdf/renderer";

export async function POST(req) {
  try {
    const { name, email, recordId } = await req.json();

    if (!name || !email || !recordId) {
      return NextResponse.json(
        { error: "Missing name, email,  or recordId" },
        { status: 400 }
      );
    }

    // Get Zoho Access Token
    const tokenPayload = new URLSearchParams({
      refresh_token: process.env.Z_REFRESH_TOKEN || "",
      client_id: process.env.Z_CLIENT_ID || "",
      client_secret: process.env.Z_CLIENT_SECRET || "",
      redirect_uri: "https://google.com/",
      grant_type: "refresh_token",
    });

    const tokenRes = await fetch(
      "https://accounts.zoho.com.au/oauth/v2/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: tokenPayload.toString(),
      }
    );

    const tokenData = await tokenRes.json();
    const access_token = tokenData.access_token;

    if (!access_token) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 500 }
      );
    }

    // Generate PDF
    const completionDate = new Date().toISOString().split("T")[0];
    const pdfBuffer = await renderToBuffer(
      <Certificate
        agentName={name}
        email={email}
        completionDate={completionDate}
      />
    );

    // Prepare FormData for Zoho CRM
    const formdata = new FormData();
    formdata.append(
      "file",
      new Blob([pdfBuffer], { type: "application/pdf" }),
      `${name}_certificate.pdf`
    );

    // Upload to Zoho CRM
    const uploadRes = await fetch(
      `https://www.zohoapis.com.au/crm/v8/Accounts/${recordId}/Attachments`,
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
        body: formdata,
      }
    );

    const result = await uploadRes.json();

    if (!uploadRes.ok) {
      return NextResponse.json(
        { error: result.message || "Failed to upload attachment" },
        { status: uploadRes.status }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
