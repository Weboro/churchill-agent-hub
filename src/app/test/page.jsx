"use client";
import { useState } from "react";

export default function FileUploadForm() {
    const [file, setFile] = useState < File | null > (null);
    const [recordId, setRecordId] = useState("");
    const [module, setModule] = useState("Accounts");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !recordId || !module) {
            setStatus("All fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("recordId", recordId);
        formData.append("module", module);

        try {
            const res = await fetch("/api/zoho/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus(`Error: ${data?.error || "Upload failed"}`);
            } else {
                setStatus("✅ File uploaded successfully to Zoho CRM.");
                console.log("Upload response:", data);
            }
        } catch (err) {
            console.error("Upload error:", err);
            setStatus(`Error: ${err.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded w-full max-w-md">
            <div>
                <label className="block mb-1">Select File:</label>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="block w-full"
                />
            </div>
            <div>
                <label className="block mb-1">Record ID:</label>
                <input
                    type="text"
                    value={recordId}
                    onChange={(e) => setRecordId(e.target.value)}
                    className="w-full border px-2 py-1"
                />
            </div>
            <div>
                <label className="block mb-1">Module Name:</label>
                <select
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                    className="w-full border px-2 py-1"
                >
                    <option value="Accounts">Accounts</option>
                    <option value="Leads">Leads</option>
                    <option value="Contacts">Contacts</option>
                    {/* Add more modules as needed */}
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Upload to Zoho
            </button>
            {status && <p className="mt-2 text-sm">{status}</p>}
        </form>
    );
}
