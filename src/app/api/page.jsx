"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Page = () => {
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [agentName, setAgentName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchDetails = async () => {
        setLoading(true);
        setError('');
        setStudentName('');
        setAgentName('');

        const authHeader = {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer 6010|ZlM1j1q28Zq0r2pBfJmsAhQtkNgqGZVQMOuhCPhif4dca64e',
            },
        };

        try {
            const studentRes = await axios.get(
                `https://churchill.galaxy360.com.au/api/v3/students/${studentId}`,
                authHeader
            );

            const studentData = studentRes.data.data?.[0];

            if (!studentData) throw new Error('No student data found');

            const { first_name, middel_name } = studentData.personaldetails || {};
            const fullName = [first_name, middel_name].filter(Boolean).join(' ');

            setStudentName(fullName);

            const agentId = studentData.courses?.agent_id;

            if (agentId) {
                const agentRes = await axios.get(
                    `https://churchill.galaxy360.com.au/api/v3/agent/${agentId}`,
                    authHeader
                );

                const agentData = agentRes.data.data;
                setAgentName(agentData?.agency_name || '');
            } else {
                setAgentName('No agent assigned');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch student or agent details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <label className="block mb-2 font-semibold">Student ID</label>
            <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <button
                onClick={handleFetchDetails}
                disabled={loading || !studentId}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                {loading ? 'Fetching...' : 'Fetch Details'}
            </button>

            {error && <p className="text-red-600">{error}</p>}

            <label className="block font-semibold">Student Name</label>
            <input
                type="text"
                value={studentName}
                readOnly
                className="border p-2 w-full mb-4 bg-gray-100"
            />

            <label className="block font-semibold">Agent Name</label>
            <input
                type="text"
                value={agentName}
                readOnly
                className="border p-2 w-full bg-gray-100"
            />
        </div>
    );
};

export default Page;
