import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

export const config = {
    api: {
        bodyParser: false, // Required for formidable
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = new formidable.IncomingForm({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Form parse error:', err);
            return res.status(500).json({ error: 'Form parse error' });
        }

        try {
            const fileObj = files.file;
            const filePath = fileObj[0]?.filepath || fileObj.filepath;

            const uploadForm = new FormData();
            uploadForm.append('file', fs.createReadStream(filePath));

            const response = await axios.post(
                'https://www.zohoapis.com.au/crm/v8/Accounts/59387000001394033/Attachments',
                uploadForm,
                {
                    headers: {
                        ...uploadForm.getHeaders(),
                        Authorization: 'Zoho-oauthtoken 1000.xxxxxxx', // Replace with valid access token
                    },
                }
            );

            return res.status(200).json(response.data);
        } catch (error) {
            console.error('Zoho upload failed:', error.response?.data || error.message);
            return res.status(500).json({ error: 'Zoho upload failed' });
        }
    });
}
