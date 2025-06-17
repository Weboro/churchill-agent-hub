"use client";
import { useState } from "react";

function FileUploadForm() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/zoho/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`Error: ${data?.error || "Upload failed"}`);
      } else {
        console.error("✅ File uploaded successfully to Zoho CRM.");
        console.log("Upload response:", data);
      }
    } catch (err) {
      console.error("Upload error:", err);
      console.error(`Error: ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded w-full max-w-md"
    >
      <div>
        <label className="block mb-1">Select File:</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload to Zoho
      </button>
    </form>
  );
}

export default FileUploadForm;
