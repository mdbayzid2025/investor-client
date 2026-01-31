"use client";

import { useState } from "react";
import { Shield, Globe, Lock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Manage your account preferences and security
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Security */}
        <div className="bg-[#111111] border border-primary/20 rounded-lg p-3 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-6 sm:size-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Shield className="size-4 sm:size-5 text-primary" />
            </div>
            <div>
              <h2 className="sm:text-xl lg:text-2xl font-serif text-white">
                Security
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Manage your account security
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/user-dashboard/change-password")}
              className="w-full p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors text-left flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                <div>
                  <div className="text-sm sm:text-base text-white font-medium">
                    Change Password
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Update your account password
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </button>

            {/* <button className="w-full p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors text-left flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-white font-medium">
                    Two-Factor Authentication
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Enabled via SMS
                  </div>
                </div>
              </div>
              <div className="text-[#D4AF37]">Manage</div>
            </button>

            <button className="w-full p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors text-left flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-white font-medium">Active Sessions</div>
                  <div className="text-sm text-gray-400">2 active devices</div>
                </div>
              </div>
              <div className="text-[#D4AF37]">View All</div>
            </button> */}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-[#111111] border border-primary/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-6 sm:size-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Globe className="size-4 sm:size-5 text-primary" />
            </div>
            <div>
              <h2 className="sm:text-xl lg:text-2xl font-serif text-white">
                Preferences
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Customize your experience
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm sm:text-base">
              <label className="block text-sm font-medium text-gray-300 mb-2 ">
                Language
              </label>
              <select className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer">
                <option>English</option>
                <option>Afrikaans</option>
                <option>Zulu</option>
              </select>
            </div>

            <div className="text-sm sm:text-base">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Currency
              </label>
              <select className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer">
                <option>ZAR (R)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>

            <div className="text-sm sm:text-base">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Time Zone
              </label>
              <select className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer">
                <option>South Africa (GMT+2)</option>
                <option>UTC</option>
                <option>EST (GMT-5)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button className="flex-1 px-8 py-3 bg-primary text-[#1A1A1A] font-medium border border-primary/30 rounded-lg hover:border-primary hover:bg-[#2A2A2A] transition-all cursor-pointer">
            Save All Changes
          </button>
          <button className="px-8 py-3 bg-[#1A1A1A] text-white border border-primary/30 rounded-lg hover:border-primary hover:bg-[#2A2A2A] transition-all cursor-pointer">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
