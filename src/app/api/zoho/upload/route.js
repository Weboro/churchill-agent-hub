import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, location, recordId } = await req.json();

    if (!name || !email || !location || !recordId) {
      return NextResponse.json(
        { error: "Missing name, email, location, or recordId" },
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

    // const pdfBuffer = await renderToBuffer(
    //   <Certificate
    //     agentName={name}
    //     email={email}
    //     completionDate={completionDate}
    //   />
    // );

    // Prepare PDF for upload
    const form = new FormData();
    // form.append(
    //   "file",
    //   new Blob([pdfBuffer], { type: "application/pdf" }),
    //   `${name}_certificate.pdf`
    // );

    // Upload to Zoho CRM
    const uploadRes = await fetch(
      `https://www.zohoapis.com.au/crm/v8/Accounts/${recordId}/Attachments`,
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
        body: form,
      }
    );

    const result = await uploadRes.json();

    const certificateSend = await sendCertificate(email, name);

    if (!uploadRes.ok && !certificateSend) {
      return NextResponse.json({ error: result }, { status: uploadRes.status });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
