"use client";

import React, { useState } from "react";
import {
  Shield,
  Upload,
  Check,
  ChevronRight,
  FileText,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useVerifyAccountMutation } from "@/redux/slice/userApi";

const STEPS = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Financial Status" },
  { id: 3, title: "Documents" },
  { id: 4, title: "Review" },
] as const;

const INVESTOR_TYPES = [
  { value: "individual_investor",       label: "Individual Investor" },
  { value: "institutional_investor",    label: "Institutional Investor" },
  { value: "family_office",             label: "Family Office" },
  { value: "fund_manager",              label: "Fund Manager" },
] as const;

interface IdentityVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IdentityVerificationModal({
  isOpen,
  onClose,
}: IdentityVerificationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [verifyAccount] = useVerifyAccountMutation();

  const [formData, setFormData] = useState({
    name: "",
    idOrPassportNumber: "",
    residentialAddress: "",
    investorClassification: "",
    sourceOfFunds: "", // unused for now — keep if needed later
    documentType: "NID",
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    setPreview("");
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        formData.name.trim().length >= 2 &&
        formData.idOrPassportNumber.trim().length >= 4 &&
        formData.residentialAddress.trim().length >= 5
      );
    }
    if (currentStep === 2) {
      return !!formData.investorClassification;
    }
    if (currentStep === 3) {
      return !!file;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload your identification document");
      return;
    }

    if (!formData.investorClassification) {
      toast.error("Please select investor classification");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("data", JSON.stringify(formData));
      payload.append("image", file); 
      
      const response = await verifyAccount(payload).unwrap();      
      toast.success(response.message || "Verification submitted successfully!");
      onClose();
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.message ||
        "Failed to submit verification. Please try again.";
      toast.error(message);
      console.error("Verification submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="max-w-3xl w-full my-auto max-h-[95vh] overflow-y-auto no-scrollbar">
        <div className="bg-[#0D0D0D] border border-primary/20 rounded-xl sm:rounded-2xl shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-serif text-white mb-2">
                Investor Verification
              </h1>
              <p className="text-sm text-gray-400 max-w-sm mx-auto">
                Complete your profile to unlock exclusive deal flow and off-market opportunities.
              </p>
            </div>

            {/* Steps */}
            <div className="mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                {STEPS.map((step, index) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;

                  return (
                    <React.Fragment key={step.id}>
                      <div className="flex sm:flex-col items-center gap-3 sm:gap-2">
                        <div
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors
                            ${isCompleted
                              ? "bg-primary border-primary text-black"
                              : isActive
                              ? "border-primary text-primary"
                              : "border-gray-700 text-gray-600"}
                          `}
                        >
                          {isCompleted ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <span className="font-serif font-bold text-base">
                              {step.id}
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-xs uppercase tracking-wide sm:mt-2 font-medium
                            ${isActive || isCompleted ? "text-primary" : "text-gray-600"}`}
                        >
                          {step.title}
                        </span>
                      </div>

                      {index < STEPS.length - 1 && (
                        <>
                          <div
                            className={`hidden sm:block flex-1 h-px mx-4 transition-colors ${
                              isCompleted ? "bg-primary" : "bg-gray-800"
                            }`}
                          />
                          <div
                            className={`sm:hidden w-px h-8 ml-5 transition-colors ${
                              isCompleted ? "bg-primary" : "bg-gray-800"
                            }`}
                          />
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="bg-[#111111] border border-primary/10 rounded-xl p-6 sm:p-8 shadow-inner">
                {/* Step 1 */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl text-white font-serif mb-6 border-b border-primary/10 pb-2">
                      Personal Details
                    </h2>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-primary/30 rounded-lg p-3 text-white focus:border-primary outline-none"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">ID / Passport Number *</label>
                        <input
                          type="text"
                          value={formData.idOrPassportNumber}
                          onChange={(e) => setFormData({ ...formData, idOrPassportNumber: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-primary/30 rounded-lg p-3 text-white focus:border-primary outline-none"
                          placeholder="Enter ID or passport number"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Residential Address *</label>
                        <input
                          type="text"
                          value={formData.residentialAddress}
                          onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-primary/30 rounded-lg p-3 text-white focus:border-primary outline-none"
                          placeholder="123 Example Street, City"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl text-white font-serif mb-6 border-b border-primary/10 pb-2">
                      Investor Classification
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {INVESTOR_TYPES.map(({ value, label }) => (
                        <label
                          key={value}
                          className={`
                            flex items-center p-4 border rounded-lg cursor-pointer transition-all
                            ${formData.investorClassification === value
                              ? "border-primary bg-primary/10"
                              : "border-gray-700 hover:border-gray-500"}
                          `}
                        >
                          <input
                            type="radio"
                            name="investorType"
                            value={value}
                            checked={formData.investorClassification === value}
                            onChange={() =>
                              setFormData({ ...formData, investorClassification: value })
                            }
                            className="hidden"
                          />
                          <div
                            className={`
                              w-5 h-5 rounded-full border flex items-center justify-center mr-3 shrink-0
                              ${formData.investorClassification === value ? "border-primary" : "border-gray-500"}
                            `}
                          >
                            {formData.investorClassification === value && (
                              <div className="w-3 h-3 rounded-full bg-primary" />
                            )}
                          </div>
                          <span className="text-white">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl text-white font-serif mb-6 border-b border-primary/10 pb-2">
                      Document Upload
                    </h2>

                    <label
                      htmlFor="document-upload"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleFileSelect(e.dataTransfer.files[0] ?? null);
                      }}
                      className={`
                        block border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors
                        ${preview ? "p-4 border-primary/50 bg-primary/5" : "p-10 sm:p-16 border-primary/30 hover:border-primary/60 bg-[#0A0A0A]"}
                      `}
                    >
                      {preview ? (
                        <div className="relative">
                          <img
                            src={preview}
                            alt="Document preview"
                            className="max-h-64 mx-auto rounded border object-contain"
                          />
                          <button
                            type="button"
                            onClick={clearFile}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 shadow-md hover:bg-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                          <h3 className="text-white font-medium mb-2">Upload ID / Passport</h3>
                          <p className="text-gray-500 text-sm mb-1">Click or drag & drop here</p>
                          <p className="text-gray-600 text-xs">JPG, PNG, PDF • Max 10 MB</p>
                        </>
                      )}

                      <input
                        id="document-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
                      />
                    </label>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Document Type</label>
                      <select
                        value={formData.documentType}
                        onChange={(e) =>
                          setFormData({ ...formData, documentType: e.target.value })
                        }
                        className="w-full bg-[#0A0A0A] border border-primary/30 rounded-lg p-3 text-white focus:border-primary outline-none"
                      >
                        <option value="NID">National ID</option>
                        <option value="PASSPORT">Passport</option>
                        <option value="DRIVING_LICENSE">Driving License</option>
                        <option value="UTILITY_BILL">Utility Bill</option>
                        <option value="BANK_STATEMENT">Bank Statement</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 4 - Review */}
                {currentStep === 4 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-serif text-white mb-4">Application Ready</h2>
                    <p className="text-gray-400 max-w-md mx-auto mb-8">
                      Please double-check all information matches your official documents.
                      Our team will review your submission within 24 hours.
                    </p>

                    <div className="bg-[#1A1A1A] max-w-2xl mx-auto p-6 rounded-lg border border-gray-800 text-left space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-gray-400">Full Name</div>
                        <div className="text-white">{formData.name || "—"}</div>

                        <div className="text-gray-400">ID / Passport No.</div>
                        <div className="text-white">{formData.idOrPassportNumber || "—"}</div>

                        <div className="text-gray-400">Address</div>
                        <div className="text-white">{formData.residentialAddress || "—"}</div>

                        <div className="text-gray-400">Investor Type</div>
                        <div className="text-white">
                          {INVESTOR_TYPES.find(t => t.value === formData.investorClassification)?.label || "—"}
                        </div>

                        <div className="text-gray-400">Document Type</div>
                        <div className="text-white">{formData.documentType || "—"}</div>
                      </div>

                      {preview && (
                        <div className="pt-4 border-t border-gray-800">
                          <p className="text-gray-300 font-medium mb-3">Uploaded Document Preview</p>
                          <img
                            src={preview}
                            alt="Document preview"
                            className="max-h-64 w-full object-contain rounded border bg-black/40"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-primary/10 gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`
                      px-8 py-3 rounded-lg text-gray-400 hover:text-white transition-colors text-base
                      ${currentStep === 1 ? "invisible" : ""}
                    `}
                  >
                    Back
                  </button>

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className={`
                        w-full sm:w-auto px-10 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
                        ${isStepValid()
                          ? "bg-primary text-black hover:bg-[#F4CF57] shadow-lg shadow-primary/20"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"}
                      `}
                    >
                      Continue <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !isStepValid()}
                      className={`
                        w-full sm:w-auto px-10 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
                        ${isSubmitting || !isStepValid()
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-primary text-black hover:bg-[#F4CF57] shadow-lg shadow-primary/20"}
                      `}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}