"use client";

import React, { useState } from "react";
import { User, Mail, CheckCircle, Building, Shield } from "lucide-react";
import IdentityVerificationModal from "@/components/dashboard/Profile/IdentityVerificationModal";

const ROLES = ["Investor", "Seller", "Agent", "Developer"] as const;
type Role = (typeof ROLES)[number];

export default function Profile() {
  const [role, setRole] = useState<Role>("Investor");
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // Mock verification status
  const [isVerified] = useState(false);

  const [formData, setFormData] = useState({
    name: "Investor001",
    email: "investor@example.com",
    phone: "+27 82 123 4567",
    budget: "R 5,000,000 - R 20,000,000",
    buyingPower: "Cash + Finance",
    agencyName: "",
    ffcNumber: "",
    companyName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Update profile:", { role, ...formData });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif text-white mb-2">
          Profile & Role
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Manage your identity and professional details.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Role Selection */}
        <div className="bg-[#111111] border border-primary/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-serif text-white mb-4">
            Account Type
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-3 py-2.5 sm:px-6 sm:py-3 rounded-lg border text-sm sm:text-base font-medium transition cursor-pointer ${
                  role === r
                    ? "bg-primary text-black border-primary"
                    : "bg-[#1A1A1A] text-gray-400 border-transparent hover:border-primary/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* KYC Status */}
        <div
          className={`border rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 ${
            isVerified
              ? "bg-linear-to-br from-green-900/20 to-[#111111] border-green-500/30"
              : "bg-linear-to-br from-amber-900/10 to-[#111111] border-primary/30"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${
                isVerified ? "bg-green-500/20" : "bg-primary/10"
              }`}
            >
              {isVerified ? (
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              ) : (
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              )}
            </div>
            <div>
              <h3
                className={`text-base sm:text-lg font-medium ${
                  isVerified ? "text-white" : "text-primary"
                }`}
              >
                {isVerified ? "KYC Verified" : "Identity Verification Required"}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                {isVerified
                  ? "Your identity has been confirmed by our team."
                  : "Complete verification to access exclusive deal flow."}
              </p>
            </div>
          </div>

          {!isVerified && (
            <button
              onClick={() => setShowVerificationModal(true)}
              className="bg-primary text-black px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium hover:bg-[#E4C77D] transition w-full sm:w-auto cursor-pointer"
            >
              Start Verification
            </button>
          )}
        </div>

        {/* Profile Form */}
        <div className="bg-[#111111] border border-primary/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-serif text-white mb-6">
            Details
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                  Display Name (Anonymous)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-primary/20 rounded-lg pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-primary outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-[#1A1A1A] border border-primary/10 rounded-lg pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Role-Specific Fields */}
            <div className="space-y-4 sm:space-y-6">
              {role === "Investor" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <input
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Target Budget"
                    className="w-full bg-[#0A0A0A] border border-primary/20 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none focus:border-primary"
                  />
                  <input
                    name="buyingPower"
                    value={formData.buyingPower}
                    onChange={handleChange}
                    placeholder="Buying Power Source"
                    className="w-full bg-[#0A0A0A] border border-primary/20 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none focus:border-primary"
                  />
                </div>
              )}

              {role === "Agent" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <input
                      name="agencyName"
                      value={formData.agencyName}
                      onChange={handleChange}
                      placeholder="Agency Name"
                      className="w-full bg-[#0A0A0A] border border-primary/20 rounded-lg pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none focus:border-primary"
                    />
                  </div>
                  <input
                    name="ffcNumber"
                    value={formData.ffcNumber}
                    onChange={handleChange}
                    placeholder="FFC Number"
                    className="w-full bg-[#0A0A0A] border border-primary/20 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none focus:border-primary"
                  />
                </div>
              )}

              {role === "Developer" && (
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full bg-[#0A0A0A] border border-primary/20 rounded-lg pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none focus:border-primary"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-primary text-black px-8 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#E4C77D] transition w-full sm:w-auto shadow-lg shadow-primary/10 cursor-pointer"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* Verification Modal */}
      <IdentityVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
      />
    </div>
  );
}
