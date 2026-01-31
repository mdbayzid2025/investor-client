"use client";

import React, { useState } from "react";
import {
  Shield,
  Upload,
  Check,
  ChevronRight,
  FileText,
  Lock,
  X,
} from "lucide-react";
import { toast } from "sonner";

const STEPS = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Financial Status" },
  { id: 3, title: "Documents" },
  { id: 4, title: "Review" },
];

interface IdentityVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IdentityVerificationModal({
  isOpen,
  onClose,
}: IdentityVerificationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    phone: "",
    address: "",
    investorType: "",
    netWorth: "",
    sourceOfFunds: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const validFiles = Array.from(selectedFiles).filter(
      (file) =>
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type) &&
        file.size <= 10 * 1024 * 1024, // 10MB
    );

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="max-w-3xl w-full my-auto max-h-[95vh] overflow-y-auto sm:overflow-visible no-scrollbar">
        <div className="bg-[#0D0D0D] border border-primary/20 rounded-xl sm:rounded-2xl shadow-2xl relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 hover:text-white transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="p-5 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 pt-2">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h1 className="text-2xl sm:text-3xl font-serif text-white mb-2 leading-tight">
                Investor Verification
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
                Complete your profile to access exclusive deal flow and
                off-market opportunities.
              </p>
            </div>

            {/* Step Header */}
            <div className="mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                {STEPS.map((step, index) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;

                  return (
                    <React.Fragment key={step.id}>
                      {/* Step */}
                      <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0">
                        {/* Circle */}
                        <div
                          className={`
                w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2
                transition-colors shrink-0
                ${
                  isCompleted
                    ? "bg-primary border-primary text-black"
                    : isActive
                      ? "border-primary text-primary"
                      : "border-gray-700 text-gray-600"
                }
              `}
                        >
                          {isCompleted ? (
                            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <span className="font-serif font-bold text-sm sm:text-base">
                              {step.id}
                            </span>
                          )}
                        </div>

                        {/* Label */}
                        <span
                          className={`
                text-xs uppercase tracking-wide
                sm:mt-3
                ${isActive || isCompleted ? "text-primary" : "text-gray-600"}
              `}
                        >
                          {step.title}
                        </span>
                      </div>

                      {/* Connector */}
                      {index < STEPS.length - 1 && (
                        <>
                          {/* Horizontal (desktop) */}
                          <div
                            className={`hidden sm:block flex-1 h-px mx-3 transition-colors ${
                              currentStep > step.id
                                ? "bg-primary"
                                : "bg-gray-800"
                            }`}
                          />

                          {/* Vertical (mobile) */}
                          <div
                            className={`sm:hidden w-px h-6 ml-4 transition-colors ${
                              currentStep > step.id
                                ? "bg-primary"
                                : "bg-gray-800"
                            }`}
                          />
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-[#111111] border border-primary/10 rounded-lg sm:rounded-xl p-5 sm:p-8 shadow-inner">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-xl text-white font-serif mb-6 border-b border-primary/10 pb-2">
                    Personal Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-gray-400 text-xs sm:text-sm mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#0A0A0A] border border-primary/30 rounded p-2.5 sm:p-3 text-sm sm:text-base text-white focus:border-primary outline-none transition-colors"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs sm:text-sm mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#0A0A0A] border border-primary/30 rounded p-2.5 sm:p-3 text-sm sm:text-base text-white focus:border-primary outline-none transition-colors"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        placeholder="Doe"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-gray-400 text-xs sm:text-sm mb-2">
                        ID / Passport Number
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#0A0A0A] border border-primary/30 rounded p-2.5 sm:p-3 text-sm sm:text-base text-white focus:border-primary outline-none transition-colors"
                        value={formData.idNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, idNumber: e.target.value })
                        }
                        placeholder="ID12345678"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-gray-400 text-xs sm:text-sm mb-2">
                        Residential Address
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#0A0A0A] border border-primary/30 rounded p-2.5 sm:p-3 text-sm sm:text-base text-white focus:border-primary outline-none transition-colors"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="123 Luxury Ave, Sandton"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-xl text-white font-serif mb-6 border-b border-primary/10 pb-2">
                    Financial Accreditation
                  </h2>
                  <div className="space-y-4">
                    <label className="block text-gray-400 text-xs sm:text-sm mb-2">
                      Investor Classification
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "Individual Investor",
                        "Institutional Investor",
                        "Family Office",
                        "Fund Manager",
                      ].map((type) => (
                        <label
                          key={type}
                          className={`flex items-center p-3 sm:p-4 border rounded cursor-pointer transition-all ${
                            formData.investorType === type
                              ? "border-primary bg-primary/10"
                              : "border-gray-800 hover:border-gray-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name="investorType"
                            className="hidden"
                            checked={formData.investorType === type}
                            onChange={() =>
                              setFormData({ ...formData, investorType: type })
                            }
                          />
                          <div
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border mr-3 flex items-center justify-center shrink-0 ${
                              formData.investorType === type
                                ? "border-primary"
                                : "border-gray-600"
                            }`}
                          >
                            {formData.investorType === type && (
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <span className="text-white text-xs sm:text-sm md:text-base">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-xl text-white font-serif mb-6 border-b border-primary/10 pb-2">
                    Document Verification
                  </h2>

                  {/* Upload Area */}
                  <label
                    htmlFor="file-upload"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="block border-2 border-dashed border-primary/30 rounded-xl p-6 sm:p-12 text-center hover:border-primary transition-colors cursor-pointer bg-[#0A0A0A]"
                  >
                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      Upload ID or Passport
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
                      Drag and drop or click to browse
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600">
                      PDF, JPG, PNG • Max 10MB
                    </p>

                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </label>

                  {/* Uploaded Files */}
                  {files.length > 0 && (
                    <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                      {files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-[#1A1A1A] p-2.5 sm:p-3 rounded border border-gray-800"
                        >
                          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300 truncate">
                              {file.name}
                            </span>
                          </div>

                          <button
                            onClick={() => removeFile(idx)}
                            className="text-gray-500 hover:text-red-400 transition cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="flex gap-2.5 sm:gap-3 bg-blue-900/10 border border-blue-900/30 p-3 sm:p-4 rounded text-[11px] sm:text-xs md:text-sm text-blue-200 mt-6 md:mt-8">
                    <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Your documents are encrypted and stored securely. We never
                      share your personal data without your explicit consent.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center py-4 sm:py-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                    <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif text-white mb-3 sm:mb-4">
                    Ready for Review
                  </h2>
                  <p className="text-gray-400 max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8 text-xs sm:text-sm">
                    Please ensure all provided information matches your official
                    documents. Our compliance team will review your application
                    within 24 hours.
                  </p>

                  <div className="bg-[#1A1A1A] max-w-sm mx-auto p-4 sm:p-5 rounded-lg border border-gray-800 text-left mb-6 sm:mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-500 text-xs sm:text-sm">
                        Full Name
                      </span>
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-500 text-xs sm:text-sm">
                        Account Type
                      </span>
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {formData.investorType || "Not Selected"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs sm:text-sm">
                        Verification docs
                      </span>
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {files.length} {files.length === 1 ? "File" : "Files"}{" "}
                        Attached
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-primary/10 gap-4 sm:gap-0">
                <button
                  onClick={handleBack}
                  className={`cursor-pointer order-2 sm:order-1 px-6 py-2 rounded text-gray-400 hover:text-white transition-colors text-sm sm:text-base ${
                    currentStep === 1 ? "sm:invisible hidden" : ""
                  }`}
                >
                  Back
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="cursor-pointer order-1 sm:order-2 w-full sm:w-auto bg-primary text-black px-8 py-2.5 sm:py-3 rounded font-semibold hover:bg-[#F4CF57] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10 text-sm sm:text-base"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      toast.success("Identity verification submitted!");
                      onClose();
                    }}
                    className="cursor-pointer order-1 sm:order-2 w-full sm:w-auto bg-primary text-black px-8 py-2.5 sm:py-3 rounded font-semibold hover:bg-[#F4CF57] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10 text-sm sm:text-base border border-primary/20"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
