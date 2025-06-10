"use client";
import React, { useState } from 'react';
import { Calculator, FileText, ExternalLink } from 'lucide-react';

const page = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        studentName: '',
        enrollmentDate: '',
        feePayment: '',
        enrollmentFee: '0',
        saafFee: '0',
        incentive: '0',
        location: '',
        gstRegistered: ''
    });

    const [result, setResult] = useState({
        show: false,
        error: false,
        baseCommission: 0,
        gstAmount: 0,
        totalAmount: 0,
        message: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Hide GST section if location changes from Australia
        if (field === 'location' && value !== 'australia') {
            setFormData(prev => ({
                ...prev,
                gstRegistered: ''
            }));
        }
    };

    const validateStudent = () => {
        const { studentId, studentName } = formData;

        if (studentId === "12345" && studentName.toLowerCase() === "john doe") {
            alert("Student validated successfully!");
        } else {
            alert("Student ID and Name do not match any records.");
        }
    };

    const calculateCommission = () => {
        const fee = parseFloat(formData.feePayment) || 0;
        const incentive = parseFloat(formData.incentive) || 0;
        const enrollmentDate = new Date(formData.enrollmentDate);
        const today = new Date();

        // Validation
        if (!formData.location) {
            setResult({
                show: true,
                error: true,
                message: "Please select your location (Australia or Overseas).",
                baseCommission: 0,
                gstAmount: 0,
                totalAmount: 0
            });
            return;
        }

        if (formData.location === "australia" && !formData.gstRegistered) {
            setResult({
                show: true,
                error: true,
                message: "Please select your GST registration status.",
                baseCommission: 0,
                gstAmount: 0,
                totalAmount: 0
            });
            return;
        }

        if (enrollmentDate > today) {
            setResult({
                show: true,
                error: true,
                message: "Commission is not claimable: Enrollment date is in the future.",
                baseCommission: 0,
                gstAmount: 0,
                totalAmount: 0
            });
            return;
        }

        if (fee <= 0) {
            setResult({
                show: true,
                error: true,
                message: "Please enter a valid fee payment amount.",
                baseCommission: 0,
                gstAmount: 0,
                totalAmount: 0
            });
            return;
        }

        // Calculate commission
        const claimableBase = fee - incentive;
        const baseCommission = claimableBase * 0.20;

        let gstAmount = 0;
        let totalCommission = baseCommission;

        if (formData.location === "australia" && formData.gstRegistered === "yes") {
            gstAmount = baseCommission * 0.10;
            totalCommission = baseCommission + gstAmount;
        }

        setResult({
            show: true,
            error: false,
            baseCommission,
            gstAmount,
            totalAmount: totalCommission,
            message: "Commission calculated successfully!"
        });
    };

    const generatePDF = () => {
        if (!result.show || result.error || result.baseCommission === 0) {
            alert("Please calculate commission first before generating PDF.");
            return;
        }

        // Create PDF content (simplified for demo)
        const pdfContent = `
COMMISSION INVOICE

Invoice To: MPIKA HOLDINGS PTY LTD T/as Churchill Institute of Higher Education
ABN: 123 456 789
Address: Level 2, 345 Queen Street, Melbourne VIC 3000

Student Name: ${formData.studentName}
Enrollment Date: ${formData.enrollmentDate}
Tuition Fee Paid: AUD ${formData.feePayment}
Incentive Given: AUD ${formData.incentive}

Base Commission (20%): AUD ${result.baseCommission.toFixed(2)}
${result.gstAmount > 0 ? `GST (10%): AUD ${result.gstAmount.toFixed(2)}` : 'GST: Not applicable'}
Total Amount: AUD ${result.totalAmount.toFixed(2)}
    `;

        // For demo purposes, we'll show the content in an alert
        // In a real implementation, you'd use jsPDF or similar
        alert("PDF Content (would be downloaded):\n\n" + pdfContent);
    };

    return (

        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border-t-4 border-orange-500">
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <Calculator className="w-8 h-8 text-orange-500 mr-3" />
                            <h1 className="text-3xl font-bold text-orange-500">Agent Commission Calculator</h1>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Student ID */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Student ID:
                            </label>
                            <input
                                type="text"
                                value={formData.studentId}
                                onChange={(e) => handleInputChange('studentId', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        {/* Student Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Student Name:
                            </label>
                            <input
                                type="text"
                                value={formData.studentName}
                                onChange={(e) => handleInputChange('studentName', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors mb-3"
                                required
                            />
                            <button
                                type="button"
                                onClick={validateStudent}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                            >
                                Validate Student
                            </button>
                        </div>

                        {/* Enrollment Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Enrollment Date:
                            </label>
                            <input
                                type="date"
                                value={formData.enrollmentDate}
                                onChange={(e) => handleInputChange('enrollmentDate', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                                required
                            />
                            <p className="text-sm text-gray-500 italic mt-1">
                                * Student commission is only claimable for past enrollment
                            </p>
                        </div>

                        {/* Student Fee Payment */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Student Fee Payment (AUD):
                            </label>
                            <input
                                type="number"
                                value={formData.feePayment}
                                onChange={(e) => handleInputChange('feePayment', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        {/* Enrollment Fee */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Student Enrollment Fee:
                            </label>
                            <select
                                value={formData.enrollmentFee}
                                onChange={(e) => handleInputChange('enrollmentFee', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                            >
                                <option value="0">Not Applicable</option>
                                <option value="200">200</option>
                            </select>
                        </div>

                        {/* SAAF Fee */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Student SAAF Fee:
                            </label>
                            <select
                                value={formData.saafFee}
                                onChange={(e) => handleInputChange('saafFee', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                            >
                                <option value="0">Not Applicable</option>
                                <option value="500">500</option>
                            </select>
                        </div>

                        {/* Incentive */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Incentive Given (AUD):
                            </label>
                            <input
                                type="number"
                                value={formData.incentive}
                                onChange={(e) => handleInputChange('incentive', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                                step="0.01"
                                min="0"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Are you based in Australia or Overseas?
                            </label>
                            <select
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                            >
                                <option value="">Please select...</option>
                                <option value="overseas">Overseas</option>
                                <option value="australia">Australia</option>
                            </select>
                        </div>

                        {/* GST Section - Only show if Australia is selected */}
                        {formData.location === 'australia' && (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Are you registered for GST?
                                </label>
                                <div className="flex items-center mb-4 text-sm text-gray-600">
                                    <span>If you are not sure, you can check using this link: </span>
                                    <a
                                        href="https://abr.business.gov.au/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-orange-600 font-semibold hover:text-orange-700 ml-1 flex items-center"
                                    >
                                        https://abr.business.gov.au/
                                        <ExternalLink className="w-3 h-3 ml-1" />
                                    </a>
                                </div>
                                <select
                                    value={formData.gstRegistered}
                                    onChange={(e) => handleInputChange('gstRegistered', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                                >
                                    <option value="">Please select...</option>
                                    <option value="yes">Yes, I am registered for GST</option>
                                    <option value="no">No, I am not registered for GST</option>
                                </select>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={calculateCommission}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <Calculator className="w-5 h-5 mr-2" />
                                Calculate Commission
                            </button>

                            <button
                                type="button"
                                onClick={generatePDF}
                                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                Generate PDF Invoice
                            </button>
                        </div>
                    </div>

                    {/* Results */}
                    {result.show && (
                        <div className={`mt-8 p-6 rounded-lg border-l-4 ${result.error
                            ? 'bg-red-50 border-red-400 text-red-700'
                            : 'bg-green-50 border-green-400 text-green-700'
                            }`}>
                            {result.error ? (
                                <p className="font-semibold">{result.message}</p>
                            ) : (
                                <div>
                                    <div className="text-xl font-bold mb-4 text-center">
                                        Base Commission (20%): AUD {result.baseCommission.toFixed(2)}
                                    </div>

                                    {formData.location === "australia" && formData.gstRegistered === "yes" ? (
                                        <div className="bg-white p-4 rounded-lg border">
                                            <div className="flex justify-between mb-2">
                                                <span>GST (10%):</span>
                                                <span>AUD {result.gstAmount.toFixed(2)}</span>
                                            </div>
                                            <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                                <span>Total Amount (including GST):</span>
                                                <span>AUD {result.totalAmount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-gray-600 mb-2">
                                                {formData.location === "overseas"
                                                    ? "No GST applicable (Overseas)"
                                                    : "No GST applicable (Not registered)"}
                                            </p>
                                            <div className="border-t pt-4 font-bold text-lg">
                                                Total Claimable Commission: AUD {result.totalAmount.toFixed(2)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default page;