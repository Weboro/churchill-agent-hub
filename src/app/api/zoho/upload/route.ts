// /app/api/zoho/upload/route.ts (for Next.js App Router)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const recordId = formData.get("recordId") as string;
        const module = formData.get("module") as string;

        if (!file || !recordId || !module) {
            return NextResponse.json(
                { error: "Missing file, recordId, or module" },
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

        const tokenRes = await fetch("https://accounts.zoho.com.au/oauth/v2/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: tokenPayload.toString(),
        });

        const tokenData = await tokenRes.json();
        const access_token = tokenData.access_token;

        if (!access_token) {
            return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
        }

        // Convert File to Buffer
        const blob = file as unknown as Blob;
        const buffer = Buffer.from(await blob.arrayBuffer());

        const form = new FormData();
        form.append("file", new Blob([buffer], { type: file.type }), file.name);

        const uploadRes = await fetch(
            `https://www.zohoapis.com.au/crm/v8/${module}/${recordId}/Attachments`,
            {
                method: "POST",
                headers: {
                    Authorization: `Zoho-oauthtoken ${access_token}`,
                },
                body: form,
            }
        );

        const result = await uploadRes.json();

        if (!uploadRes.ok) {
            return NextResponse.json({ error: result }, { status: uploadRes.status });
        }

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
