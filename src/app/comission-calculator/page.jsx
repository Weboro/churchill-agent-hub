"use client";
import React, { useState } from "react";
import { Calculator, FileText, ExternalLink } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function CommissionCalculator() {
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    enrollmentDate: "",
    feePayment: "",
    enrollmentFee: "0",
    saafFee: "0",
    incentive: "0",
    location: "",
    gstRegistered: "",
    isValidatingStudent: false,
    isStudentValid: false,
    isFirstSemester: "",
  });

  const [result, setResult] = useState({
    show: false,
    error: false,
    baseCommission: 0,
    gstAmount: 0,
    totalAmount: 0,
    message: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "location" && value !== "australia") {
      setFormData((prev) => ({
        ...prev,
        gstRegistered: "",
      }));
    }

    if (field === "isFirstSemester" && value === "no") {
      setFormData((prev) => ({
        ...prev,
        enrollmentFee: "0",
        saafFee: "0",
      }));
    }
  };

  const validateStudent = async () => {
    const { studentId } = formData;

    if (!studentId) {
      toast.error("Please enter a Student ID");
      return;
    }

    setFormData((prev) => ({ ...prev, isValidatingStudent: true }));

    try {
      const response = await fetch("/api/check-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
        }),
      });

      if (response.ok) {
        const { data } = await response.json();

        const {
          generated_stud_id,
          first_name,
          family_name,
          middel_name,
          name_title,
        } = data.personaldetails;

        setFormData((prev) => ({
          ...prev,
          studentName: [name_title, first_name, middel_name, family_name]
            .filter(Boolean)
            .join(" "),
        }));

        setFormData((prev) => ({ ...prev, isStudentValid: true }));
      } else {
        const { message } = await response.json();
        toast.error(message || "Student not found");
        throw new Error(message || "Error while receiving");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setFormData((prev) => ({ ...prev, isValidatingStudent: false }));
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
        totalAmount: 0,
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
        totalAmount: 0,
      });
      return;
    }

    if (!formData.isFirstSemester) {
      setResult({
        show: true,
        error: true,
        message: "Please select if claiming commission for first semester.",
        baseCommission: 0,
        gstAmount: 0,
        totalAmount: 0,
      });
      return;
    }

    if (enrollmentDate > today) {
      setResult({
        show: true,
        error: true,
        message:
          "Commission is not claimable: Enrollment date is in the future.",
        baseCommission: 0,
        gstAmount: 0,
        totalAmount: 0,
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
        totalAmount: 0,
      });
      return;
    }

    // Calculate commission
    const enrollmentFee = parseFloat(formData.enrollmentFee) || 0;
    const saafFee = parseFloat(formData.saafFee) || 0;

    const claimableBase = fee - enrollmentFee - saafFee - incentive;
    const baseCommission = claimableBase * 0.2;

    let gstAmount = 0;
    let totalCommission = baseCommission;

    if (formData.location === "australia" && formData.gstRegistered === "yes") {
      gstAmount = baseCommission * 0.1;
      totalCommission = baseCommission + gstAmount;
    }

    setResult({
      show: true,
      error: false,
      baseCommission,
      gstAmount,
      totalAmount: totalCommission,
      message: "Commission calculated successfully!",
    });
  };

  const handleGeneratePDF = async () => {
    if (!result.show || result.error || result.baseCommission === 0) {
      toast.error("Please calculate commission first before generating PDF.");
      return;
    }

    try {
      const response = await fetch("/api/download-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, result }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error details from API
        console.error("API error:", errorData);
        throw new Error(
          `Failed to generate PDF: ${errorData.error || response.statusText}`
        );
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `churchill-commission-invoice-${formData.studentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download error:", error.message);
      console.error(error);
      toast.error("Something went wrong while generating the PDF.");
    }
  };

  const maskName = (fullName) => {
    if (!fullName) return "";
    const [first, last] = fullName.split(" ");
    const maskedFirst =
      first.slice(0, 3) + "*".repeat(Math.max(0, first.length - 3));
    const maskedLast = last ? "*".repeat(last.length - 3) + last.slice(-3) : "";
    return `${maskedFirst} ${maskedLast}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border-t-4 border-orange-500">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-8 h-8 text-orange-500 mr-3" />
              <h1 className="text-3xl font-bold text-orange-500">
                Education Agent Commission Calculator
              </h1>
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
                disabled={formData.isStudentValid}
                onChange={(e) => handleInputChange("studentId", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              {formData.isStudentValid && (
                <>
                  {/* Student Name */}
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Student Name:
                  </label>
                  <input
                    type="text"
                    value={maskName(formData.studentName)}
                    readOnly
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors mb-3"
                    required
                  />
                </>
              )}

              {!formData.isStudentValid && (
                <button
                  type="button"
                  onClick={() => validateStudent()}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {formData.isValidatingStudent
                    ? "Validating..."
                    : "Validate Student"}
                </button>
              )}
            </div>

            {formData.isStudentValid && (
              <>
                <hr />

                {/* First Semester Commission */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Are you claiming commission for first semester?
                  </label>
                  <select
                    value={formData.isFirstSemester}
                    onChange={(e) =>
                      handleInputChange("isFirstSemester", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  >
                    <option value="">Please select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {/* Enrollment Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enrollment Date:
                  </label>
                  <input
                    type="date"
                    value={formData.enrollmentDate}
                    onChange={(e) =>
                      handleInputChange("enrollmentDate", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleInputChange("feePayment", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                {/* Enrollment Fee - Conditional */}
                {formData.isFirstSemester === "yes" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Student Enrollment Fee:
                    </label>
                    <select
                      value={formData.enrollmentFee}
                      onChange={(e) =>
                        handleInputChange("enrollmentFee", e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    >
                      <option value="0">Not Applicable</option>
                      <option value="200">200</option>
                    </select>
                  </div>
                )}

                {/* SAAF Fee - Conditional */}
                {formData.isFirstSemester === "yes" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Student SAAF Fee:
                    </label>
                    <select
                      value={formData.saafFee}
                      onChange={(e) =>
                        handleInputChange("saafFee", e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    >
                      <option value="0">Not Applicable</option>
                      <option value="500">500</option>
                    </select>
                  </div>
                )}

                {/* Incentive */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Incentive Given (AUD):
                  </label>
                  <input
                    type="number"
                    value={formData.incentive}
                    onChange={(e) =>
                      handleInputChange("incentive", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    step="0.01"
                    min="0"
                  />
                  <p className="text-sm text-gray-500 italic mt-1">
                    * Add incentive as per your arrangement semester-wise
                  </p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Are you based in Australia or Overseas?
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  >
                    <option value="">Please select...</option>
                    <option value="overseas">Overseas</option>
                    <option value="australia">Australia</option>
                  </select>
                </div>

                {/* GST Section */}
                {formData.location === "australia" && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Are you registered for GST?
                    </label>
                    <div className="flex items-center mb-4 text-sm text-gray-600">
                      <span>
                        If you are not sure, you can check using this link:{" "}
                      </span>
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
                      onChange={(e) =>
                        handleInputChange("gstRegistered", e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    >
                      <option value="">Please select...</option>
                      <option value="yes">Yes, I am registered for GST</option>
                      <option value="no">
                        No, I am not registered for GST
                      </option>
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
                    onClick={handleGeneratePDF}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Generate PDF Invoice
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Results */}
          {result.show && (
            <div
              className={`mt-8 p-6 rounded-lg border-l-4 ${
                result.error
                  ? "bg-red-50 border-red-400 text-red-700"
                  : "bg-green-50 border-green-400 text-green-700"
              }`}
            >
              {result.error ? (
                <p className="font-semibold">{result.message}</p>
              ) : (
                <div>
                  <div className="text-xl font-bold mb-4 text-center">
                    Base Commission (20%): AUD{" "}
                    {result.baseCommission.toFixed(2)}
                  </div>

                  {formData.location === "australia" &&
                  formData.gstRegistered === "yes" ? (
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-sm text-gray-600 mb-3">
                        <div>
                          Student Fee Payment: AUD {formData.feePayment}
                        </div>
                        {formData.isFirstSemester === "yes" && (
                          <>
                            <div>
                              Less: Enrollment Fee: AUD {formData.enrollmentFee}
                            </div>
                            <div>Less: SAAF Fee: AUD {formData.saafFee}</div>
                          </>
                        )}
                        <div>Less: Incentive: AUD {formData.incentive}</div>
                        <div className="border-t pt-2 font-semibold">
                          Claimable Base: AUD{" "}
                          {(
                            parseFloat(formData.feePayment) -
                            (formData.isFirstSemester === "yes"
                              ? parseFloat(formData.enrollmentFee) +
                                parseFloat(formData.saafFee)
                              : 0) -
                            parseFloat(formData.incentive)
                          ).toFixed(2)}
                        </div>
                      </div>
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
                      <div className="text-sm text-gray-600 mb-3">
                        <div>
                          Student Fee Payment: AUD {formData.feePayment}
                        </div>
                        {formData.isFirstSemester === "yes" && (
                          <>
                            <div>
                              Less: Enrollment Fee: AUD {formData.enrollmentFee}
                            </div>
                            <div>Less: SAAF Fee: AUD {formData.saafFee}</div>
                          </>
                        )}
                        <div>Less: Incentive: AUD {formData.incentive}</div>
                        <div className="border-t pt-2 font-semibold">
                          Claimable Base: AUD{" "}
                          {(
                            parseFloat(formData.feePayment) -
                            (formData.isFirstSemester === "yes"
                              ? parseFloat(formData.enrollmentFee) +
                                parseFloat(formData.saafFee)
                              : 0) -
                            parseFloat(formData.incentive)
                          ).toFixed(2)}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {formData.location === "overseas"
                          ? "No GST applicable (Overseas)"
                          : "No GST applicable (Not registered)"}
                      </p>
                      <div className="border-t pt-4 font-bold text-lg">
                        Total Claimable Commission: AUD{" "}
                        {result.totalAmount.toFixed(2)}
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
}
