import axios from 'axios';
import { NextResponse } from 'next/server';
import cors from 'cors';

let currentAccessToken = null;

function readAccessToken() {
    return process.env.ACCESS_TOKEN || null;
}

function writeAccessToken(token) {
    currentAccessToken = token; // Only update in-memory variable
}

currentAccessToken = readAccessToken();

async function getNewAccessToken() {
    try {
        console.log('Starting token refresh request');
        const response = await axios.post(
            'https://accounts.zoho.com.au/oauth/v2/token',
            null,
            {
                params: {
                    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
                    client_id: process.env.ZOHO_CLIENT_ID,
                    client_secret: process.env.ZOHO_CLIENT_SECRET,
                    grant_type: 'refresh_token',
                    redirect_uri: process.env.ZOHO_REDIRECT_URI,
                    scope: 'ZohoCRM.modules.accounts.READ',
                },
                timeout: 10000,
            }
        );
        console.log('Token refresh request completed with status:', response.status);
        const newAccessToken = response.data.access_token;
        writeAccessToken(newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing Zoho access token:', {
            message: error.message,
            response: error.response?.data,
        });
        throw new Error('Failed to refresh access token');
    }
}

const corsMiddleware = cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET'],
});

export async function GET(req) {
    return new Promise((resolve) => {
        corsMiddleware(req, {}, async () => {
            const { searchParams } = new URL(req.url);
            const agentId = searchParams.get('agentId');

            if (!agentId) {
                resolve(NextResponse.json({ error: 'Agent ID is required' }, { status: 400 }));
                return;
            }

            async function searchAgent(accessToken) {
                try {
                    console.log('Starting Zoho CRM API request for agentId:', agentId);
                    const response = await axios.get(
                        `https://www.zohoapis.com.au/crm/v8/Accounts/search`,
                        {
                            params: {
                                criteria: `(IIE_Agent_Id:equals:${encodeURIComponent(agentId)})`,
                            },
                            headers: {
                                Authorization: `Zoho-oauthtoken ${accessToken}`,
                            },
                            timeout: 10000,
                        }
                    );
                    console.log('Zoho CRM API request completed with status:', response.status);
                    resolve(NextResponse.json(response.data, { status: 200 }));
                } catch (error) {
                    console.error('Zoho CRM API Error:', {
                        message: error.message,
                        agentId,
                        response: error.response?.data,
                    });

                    if (error.code === 'ECONNABORTED') {
                        resolve(NextResponse.json({ error: 'Request to Zoho CRM timed out' }, { status: 504 }));
                        return;
                    }

                    if (error.response?.data?.code === 'INVALID_TOKEN') {
                        try {
                            const newAccessToken = await getNewAccessToken();
                            return await searchAgent(newAccessToken);
                        } catch (tokenError) {
                            resolve(
                                NextResponse.json({ error: 'Failed to refresh access token' }, { status: 401 })
                            );
                        }
                    } else {
                        resolve(
                            NextResponse.json(
                                { error: error.response?.data?.message || 'Failed to search agent' },
                                { status: error.response?.status || 500 }
                            )
                        );
                    }
                }
            }

            if (!currentAccessToken) {
                try {
                    currentAccessToken = await getNewAccessToken();
                } catch (error) {
                    resolve(NextResponse.json({ error: 'Failed to initialize access token' }, { status: 401 }));
                    return;
                }
            }

            await searchAgent(currentAccessToken);
        });
    });
}