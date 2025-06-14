// lib/zohoAuth.js
let accessToken = null;
let tokenExpiry = null;

export async function getZohoAccessToken() {
    const now = Date.now();

    if (accessToken && tokenExpiry && now < tokenExpiry - 60 * 1000) {
        return accessToken;
    }

    const params = new URLSearchParams({
        refresh_token: process.env.Z_REFRESH_TOKEN,
        client_id: process.env.Z_CLIENT_ID,
        client_secret: process.env.Z_CLIENT_SECRET,
        grant_type: "refresh_token",
    });

    const res = await fetch(`${process.env.Z_AUTH_URL}?${params.toString()}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const data = await res.json();

    if (!data.access_token) {
        console.error("Zoho token error", data);
        throw new Error("Failed to get access token");
    }

    accessToken = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000;

    return accessToken;
}

