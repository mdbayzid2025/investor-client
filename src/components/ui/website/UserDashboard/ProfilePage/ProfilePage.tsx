"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  CheckCircle,
  Building,
  Shield,
  Upload,
  Camera,
  X,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { useEditProfileMutation } from "@/redux/slice/userApi";
import IdentityVerificationModal from "@/components/dashboard/Profile/IdentityVerificationModal";
import Image from "next/image";
import { getImageUrl } from "@/utils/baseUrl";

const ROLES = ["INVESTOR", "AGENT", "DEVELOPER", "SELLER"] as const;
type Role = (typeof ROLES)[number];

export default function ProfilePage({ profile }: any) {
  const [role, setRole] = useState<Role>("INVESTOR");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isVerified, setIsVerify] = useState(false);

  // Profile picture handling
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [editProfile, { isLoading: isSaving }] = useEditProfileMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    buyingPower: "",
    agencyName: "",
    ffcNumber: "",
    companyName: "",
  });


  console.log("profile", profile);

  // Load initial profile data
  useEffect(() => {
    if (!profile) return;

    setRole(profile.role ?? "INVESTOR");

    setForm({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      budget: profile.budget || "",
      buyingPower: profile.buyingPower || "",
      agencyName: profile.agencyName || "",
      ffcNumber: profile.ffcNumber || "",
      companyName: profile.companyName || "",
    });

    if (profile.image) {
      setPreviewUrl(profile.image);
    }
    setIsVerify(profile?.isKycVerified)
  }, [profile]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Basic client-side validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (jpg, png, webp, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };



  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    let data: any = {
      name: form.name,
      phone: form.phone,
    }

    // Conditional fields based on role
    if (role === "INVESTOR") {
      data.budget = form.budget.trim();
      data.buyingPower = form.buyingPower.trim();
    }

    if (role === "AGENT") {
      data.agencyName = form.agencyName.trim();
      data.ffcNumber = form.ffcNumber.trim();
    }

    if (role === "DEVELOPER") {
      data.companyName = form.companyName.trim();
    }

    const formData = new FormData();

    // Attach new image only if changed
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("data", JSON.stringify(data))


    try {
      const res = await editProfile(formData).unwrap();

      if (res?.success) {
        toast.success(res.message || "Profile updated successfully");

        // If backend returns new image URL
        if (res.data?.image) {
          setPreviewUrl(res.data.image);
          setImageFile(null); // clear the local File reference
        }
      }
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Could not update profile. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif text-white mb-2">
          Profile & Role
        </h1>
        <p className="text-gray-400">
          Update your personal information and account type
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Profile Photo */}
        <section className="bg-[#111] border border-primary/20 rounded-xl p-6">
          <h2 className="text-xl font-serif text-white mb-4">Profile Photo</h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-primary/30 bg-[#0a0a0a] flex items-center justify-center">
              {previewUrl ? (
                <Image
                  src={imageFile ? previewUrl : `${getImageUrl() + previewUrl}`}
                  height={150}
                  width={150}
                  alt="Profile preview"
                  className="w-full h-full object-cover rounded-full "
                />
              ) : (
                <User className="w-14 h-14 text-gray-500" />
              )}
              {imageFile &&
                <X
                  size={20}
                  onClick={() => { setImageFile(null); setPreviewUrl(profile?.image ?? ""); }}
                  className="absolute -top-5 right-0 text-red-600 cursor-pointer" />}
            </div>

            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="text-center sm:text-left">
                <p className="text-gray-300 font-medium">
                  {previewUrl ? "Current photo" : "No photo uploaded yet"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, WebP • Max 5 MB • Recommended 400×400
                </p>
              </div>

              <label
                htmlFor="profile-upload"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg cursor-pointer transition font-medium text-sm"
              >
                <Upload size={16} />
                Upload new photo
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          </div>
        </section>
             
        <div className="flex gap-3">

          {/* 1. Account Type */}
          <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Account Type
            </div>
            <div className="text-white font-bold text-lg capitalize">{profile?.role || "Developer"}</div>
          </div>

          {/* 2. Verification Status */}
          <div className={`flex-1 rounded-xl p-4 border ${isVerified ? "bg-[#0d2a1a] border-[#1a4a2a]" : "bg-[#1a1a1a] border-[#2a2a2a]"}`}>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              {isVerified ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
              Verification
            </div>
            <div className={`font-bold text-lg ${isVerified ? "text-green-400" : "text-yellow-400"}`}>
              {isVerified ? "Verified" : "Unverified"}
            </div>
            {!isVerified && (
              <button
                onClick={() => setShowVerificationModal(true)}
                className="mt-2 text-xs bg-primary hover:bg-amber-300 text-black px-3 py-1 rounded-md font-medium transition"
              >
                Verify Now
              </button>
            )}
          </div>

          {/* 3. Plan Status */}
          <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              Plan
            </div>
            <div className="text-yellow-400 font-bold text-lg capitalize">{profile?.plan || "Pro"}</div>
          </div>

        </div>


        {/* 4. Form */}
        <section className="bg-[#111] border border-primary/20 rounded-xl p-6">
          <h2 className="text-xl font-serif text-white mb-6">Account Info</h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Display Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleTextChange}
                    className="w-full bg-[#0a0a0a] border border-primary/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary outline-none transition"
                    placeholder="How others see you"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    value={form.email}
                    disabled
                    className="w-full bg-[#1a1a1a] border border-primary/10 rounded-lg pl-10 pr-4 py-3 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Role-specific fields */}
            <div className="space-y-5">
              {role === "INVESTOR" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    name="budget"
                    value={form.budget}
                    onChange={handleTextChange}
                    placeholder="Budget range (e.g. R 1M - R 10M)"
                    className="w-full bg-[#0a0a0a] border border-primary/20 rounded-lg px-4 py-3 text-white focus:border-primary outline-none"
                  />
                  <input
                    name="buyingPower"
                    value={form.buyingPower}
                    onChange={handleTextChange}
                    placeholder="Source of funds (Cash / Finance / Both)"
                    className="w-full bg-[#0a0a0a] border border-primary/20 rounded-lg px-4 py-3 text-white focus:border-primary outline-none"
                  />
                </div>
              )}

              {role === "AGENT" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      name="agencyName"
                      value={form.agencyName}
                      onChange={handleTextChange}
                      placeholder="Agency name"
                      className="w-full bg-[#0a0a0a] border border-primary/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary outline-none"
                    />
                  </div>
                  <input
                    name="ffcNumber"
                    value={form.ffcNumber}
                    onChange={handleTextChange}
                    placeholder="FFC / Licence number"
                    className="w-full bg-[#0a0a0a] border border-primary/20 rounded-lg px-4 py-3 text-white focus:border-primary outline-none"
                  />
                </div>
              )}

              {role === "DEVELOPER" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      name="companyName"
                      value={form.companyName}
                      onChange={handleTextChange}
                      placeholder="Company / developer name"
                      className="w-full bg-[#0a0a0a] border border-primary/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Phone  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleTextChange}
                      placeholder="Company / developer name"
                      className="w-full bg-[#0a0a0a] border border-primary/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition ${isSaving
                  ? "bg-primary/60 text-black/70 cursor-not-allowed"
                  : "bg-primary hover:bg-amber-300 text-black shadow-lg shadow-primary/20"
                  }`}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </section>
      </div>

      <IdentityVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
      />
    </div>
  );
}