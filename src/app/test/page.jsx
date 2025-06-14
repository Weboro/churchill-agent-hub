"use client";
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Loader2, User, Building, Mail, Phone } from 'lucide-react';

const ZohoCRMAgentFetcher = () => {
    const [config, setConfig] = useState({
        clientId: '',
        clientSecret: '',
        redirectUri: 'http://localhost:3000/test', // Update this
        agentId: 'RP-207'
    });

    const [authState, setAuthState] = useState({
        authCode: '',
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false
    });

    const [agentData, setAgentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);

    // Zoho OAuth URLs for Australian instance
    const ZOHO_AUTH_URL = 'https://accounts.zoho.com.au/oauth/v2/auth';
    const ZOHO_TOKEN_URL = 'https://accounts.zoho.com.au/oauth/v2/token';
    const ZOHO_API_BASE = 'https://www.zohoapis.com.au/crm/v8';

    // Step 1: Generate Authorization URL
    const generateAuthUrl = () => {
        if (!config.clientId || !config.redirectUri) {
            setError('Please fill in Client ID and Redirect URI');
            return;
        }

        const params = new URLSearchParams({
            scope: 'ZohoCRM.modules.ALL',
            client_id: config.clientId,
            response_type: 'code',
            access_type: 'offline',
            redirect_uri: config.redirectUri
        });

        const authUrl = `${ZOHO_AUTH_URL}?${params.toString()}`;
        window.open(authUrl, '_blank');
        setStep(2);
    };

    // Step 2: Exchange Authorization Code for Access Token
    const exchangeCodeForToken = async () => {
        if (!authState.authCode) {
            setError('Please enter the authorization code');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/zoho-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grant_type: 'authorization_code',
                    client_id: config.clientId,
                    client_secret: config.clientSecret,
                    redirect_uri: config.redirectUri,
                    code: authState.authCode
                })
            });

            if (!response.ok) {
                throw new Error('Failed to exchange code for token');
            }

            const tokenData = await response.json();

            setAuthState(prev => ({
                ...prev,
                accessToken: tokenData.access_token,
                refreshToken: tokenData.refresh_token,
                isAuthenticated: true
            }));

            setStep(3);
        } catch (err) {
            setError(`Token exchange failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Fetch Agent Details
    const fetchAgentDetails = async () => {
        if (!authState.accessToken) {
            setError('No access token available');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const searchUrl = `${ZOHO_API_BASE}/Accounts/search?criteria=(IIE_Agent_Id:equals:${config.agentId})`;

            const response = await fetch('/api/zoho-crm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: searchUrl,
                    accessToken: authState.accessToken
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch agent details');
            }

            const data = await response.json();

            if (data.data && data.data.length > 0) {
                setAgentData(data.data[0]);
            } else {
                setError('No agent found with the specified ID');
            }
        } catch (err) {
            setError(`Failed to fetch agent: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Refresh Access Token
    const refreshAccessToken = async () => {
        if (!authState.refreshToken) {
            setError('No refresh token available');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/zoho-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grant_type: 'refresh_token',
                    client_id: config.clientId,
                    client_secret: config.clientSecret,
                    refresh_token: authState.refreshToken
                })
            });

            const tokenData = await response.json();

            setAuthState(prev => ({
                ...prev,
                accessToken: tokenData.access_token
            }));

            setError('');
        } catch (err) {
            setError(`Token refresh failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Zoho CRM Agent Details Fetcher</h1>
                <p className="text-gray-600">Authenticate with Zoho CRM and fetch agent details using OAuth 2.0</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-red-700">{error}</span>
                </div>
            )}

            {/* Step 1: Configuration */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                    Configuration
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                        <input
                            type="text"
                            value={config.clientId}
                            onChange={(e) => setConfig(prev => ({ ...prev, clientId: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Zoho app client ID"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
                        <input
                            type="password"
                            value={config.clientSecret}
                            onChange={(e) => setConfig(prev => ({ ...prev, clientSecret: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Zoho app client secret"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Redirect URI</label>
                        <input
                            type="text"
                            value={config.redirectUri}
                            onChange={(e) => setConfig(prev => ({ ...prev, redirectUri: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://yourapp.com/callback"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Agent ID</label>
                        <input
                            type="text"
                            value={config.agentId}
                            onChange={(e) => setConfig(prev => ({ ...prev, agentId: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="RP-207"
                        />
                    </div>
                </div>

                <button
                    onClick={generateAuthUrl}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Generate Authorization URL
                </button>
            </div>

            {/* Step 2: Authorization Code */}
            {step >= 2 && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                        Authorization Code
                    </h2>

                    <p className="text-gray-600 mb-4">
                        After authorizing in the popup window, copy the authorization code from the redirect URL and paste it below:
                    </p>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={authState.authCode}
                            onChange={(e) => setAuthState(prev => ({ ...prev, authCode: e.target.value }))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Authorization code from redirect URL"
                        />
                        <button
                            onClick={exchangeCodeForToken}
                            disabled={loading}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
                        >
                            {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                            Get Access Token
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Fetch Agent Details */}
            {authState.isAuthenticated && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                            <CheckCircle className="h-4 w-4" />
                        </span>
                        Fetch Agent Details
                    </h2>

                    <div className="flex gap-3 mb-4">
                        <button
                            onClick={fetchAgentDetails}
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                        >
                            {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                            Fetch Agent Data
                        </button>

                        <button
                            onClick={refreshAccessToken}
                            disabled={loading}
                            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors disabled:opacity-50"
                        >
                            Refresh Token
                        </button>
                    </div>

                    <div className="text-sm text-gray-600">
                        <p>Access Token: {authState.accessToken ? '✓ Available' : '✗ Not available'}</p>
                        <p>Refresh Token: {authState.refreshToken ? '✓ Available' : '✗ Not available'}</p>
                    </div>
                </div>
            )}

            {/* Agent Details Display */}
            {agentData && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Agent Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <Building className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="font-medium">Account Name:</span>
                                <span className="ml-2">{agentData.Account_Name || 'N/A'}</span>
                            </div>

                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="font-medium">Agent ID:</span>
                                <span className="ml-2">{agentData.IIE_Agent_Id || 'N/A'}</span>
                            </div>

                            <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="font-medium">Email:</span>
                                <span className="ml-2">{agentData.Email || 'N/A'}</span>
                            </div>

                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="font-medium">Phone:</span>
                                <span className="ml-2">{agentData.Phone || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <span className="font-medium">Website:</span>
                                <span className="ml-2">{agentData.Website || 'N/A'}</span>
                            </div>

                            <div>
                                <span className="font-medium">Industry:</span>
                                <span className="ml-2">{agentData.Industry || 'N/A'}</span>
                            </div>

                            <div>
                                <span className="font-medium">Created Time:</span>
                                <span className="ml-2">{agentData.Created_Time ? new Date(agentData.Created_Time).toLocaleDateString() : 'N/A'}</span>
                            </div>

                            <div>
                                <span className="font-medium">Modified Time:</span>
                                <span className="ml-2">{agentData.Modified_Time ? new Date(agentData.Modified_Time).toLocaleDateString() : 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2">Raw Data:</h3>
                        <pre className="text-xs text-gray-600 overflow-x-auto">
                            {JSON.stringify(agentData, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ZohoCRMAgentFetcher;