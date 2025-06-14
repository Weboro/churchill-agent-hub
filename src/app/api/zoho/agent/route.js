export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { agentId, accessToken } = req.body;

    if (!agentId || !accessToken) {
        return res.status(400).json({ error: 'Agent ID and access token are required' });
    }

    try {
        const searchUrl = `https://www.zohoapis.com.au/crm/v8/Accounts/search?criteria=(IIE_Agent_Id:equals:${agentId})`;

        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`API request failed: ${data.message || 'Unknown error'}`);
        }

        if (data.data && data.data.length > 0) {
            const agent = data.data[0];
            res.status(200).json({
                found: true,
                agent: {
                    id: agent.IIE_Agent_Id,
                    name: agent.Account_Name || agent.Name,
                    email: agent.Email || agent.Account_Email,
                }
            });
        } else {
            res.status(404).json({
                found: false,
                message: 'Agent not found'
            });
        }
    } catch (error) {
        console.error('Error searching for agent:', error);
        res.status(500).json({ error: 'Failed to search for agent' });
    }
}