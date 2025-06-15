"use client";
import { useState } from 'react';

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('⚠️ Please select a file.');
            return;
        }
        // test

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            let data;
            try {
                data = await res.json();
            } catch (e) {
                const text = await res.text();
                console.error('Non-JSON response:', text);
                throw new Error('Upload failed with non-JSON response');
            }

            if (res.ok && data?.data?.[0]?.status === 'success') {
                setStatus('✅ File uploaded to Zoho successfully!');
            } else {
                console.error(data);
                setStatus('❌ Upload failed. See console for details.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setStatus('❌ Error uploading file.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Upload File to Zoho CRM</h2>
            <input type="file" onChange={handleChange} />
            <br />
            <button onClick={handleUpload} style={{ marginTop: '1rem' }}>
                Upload
            </button>
            <p>{status}</p>
        </div>
    );
}
