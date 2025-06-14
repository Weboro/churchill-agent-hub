// app/api/zoho/get-token/route.js

import { getZohoAccessToken } from "@/lib/zohoAuth";

export async function GET() {
    try {
        const accessToken = await getZohoAccessToken();

        return Response.json({
            message: "Access token refreshed successfully",
            access_token: accessToken,
        });
    } catch (error) {
        console.error("Token refresh failed:", error);
        return new Response(
            JSON.stringify({ error: "Failed to refresh Zoho access token" }),
            { status: 500 }
        );
    }
}
