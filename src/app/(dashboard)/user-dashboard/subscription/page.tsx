"use client";

import React, { useState } from "react";
import { Check, CreditCard, Calendar, Download, X, Plus } from "lucide-react";

export function Subscription() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white mb-2">
          Subscription Management
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Manage your membership and billing
        </p>
      </div>

      <div className="max-w-4xl space-y-4 sm:space-y-6">
        {/* Current Plan */}
        <div className="bg-linear-to-br from-primary/20 to-[#111111] border border-primary/30 rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">
                Premium Membership
              </h2>
              <p className="text-sm sm:text-base text-gray-300">
                Active subscription
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-3xl sm:text-4xl font-serif text-primary">
                R99
              </div>
              <div className="text-xs sm:text-sm text-gray-400">per month</div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 mb-6">
            {[
              "Unlimited investment posts",
              "Anonymous identity protection",
              "Internal secure messaging",
              "Verified investor network access",
              "Priority support",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 pt-4 border-t border-primary/20">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Next billing: February 15, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 shrink-0" />
              <span>•••• 4242</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-[#111111] border border-primary/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-serif text-white mb-4">
            Payment Method
          </h3>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#1A1A1A] rounded-lg mb-4 gap-3">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="w-10 h-8 sm:w-12 sm:h-8 bg-linear-to-br from-primary to-[#B8941F] rounded flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </div>
              <div className="flex-1 sm:flex-initial">
                <div className="text-sm sm:text-base text-white font-medium">
                  Visa ending in 4242
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Expires 12/25
                </div>
              </div>
            </div>
            <button className="px-4 py-2 text-sm text-primary hover:text-[#E4C77D] transition-colors self-end sm:self-auto cursor-pointer">
              Update
            </button>
          </div>

          <button
            onClick={() => setShowAddPayment(!showAddPayment)}
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add new payment method
          </button>
        </div>

        {/* Billing History */}
        <div className="bg-[#111111] border border-primary/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-serif text-white mb-4">
            Billing History
          </h3>

          <div className="space-y-3">
            {[
              { date: "Jan 15, 2026", amount: "R99.00", status: "Paid" },
              { date: "Dec 15, 2025", amount: "R99.00", status: "Paid" },
              { date: "Nov 15, 2025", amount: "R99.00", status: "Paid" },
            ].map((invoice, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-[#1A1A1A] rounded-lg gap-3"
              >
                <div className="flex-1">
                  <div className="text-sm sm:text-base text-white font-medium">
                    {invoice.date}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Premium Membership
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
                  <div className="text-right">
                    <div className="text-sm sm:text-base text-white font-medium">
                      {invoice.amount}
                    </div>
                    <div className="text-xs sm:text-sm text-green-400">
                      {invoice.status}
                    </div>
                  </div>
                  <button className="text-primary hover:text-[#E4C77D] transition-colors text-xs sm:text-sm flex items-center gap-1 cursor-pointer">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel Subscription */}
        <div className="bg-[#111111] border border-primary/20 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-serif text-white mb-2">
            Cancel Subscription
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-4 leading-relaxed">
            You can cancel your subscription at any time. Your access will
            continue until the end of your current billing period.
          </p>
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-4 sm:px-6 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm sm:text-base cursor-pointer"
          >
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0D0D0D] border border-red-500/30 rounded-xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-serif text-white">
                Cancel Subscription?
              </h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Are you sure you want to cancel your Premium Membership? You will
              lose access to all premium features at the end of your current
              billing period (February 15, 2026).
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2.5 bg-primary text-black font-medium rounded-lg hover:bg-[#E4C77D] transition-colors cursor-pointer"
              >
                Keep Subscription
              </button>
              <button
                onClick={() => {
                  // Handle cancellation logic here
                  setShowCancelModal(false);
                }}
                className="flex-1 px-4 py-2.5 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal (Optional - you can implement this) */}
      {showAddPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0D0D0D] border border-primary/30 rounded-xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-serif text-white">
                Add Payment Method
              </h3>
              <button
                onClick={() => setShowAddPayment(false)}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowAddPayment(false)}
                className="w-full px-4 py-2.5 bg-primary text-black font-medium rounded-lg hover:bg-[#E4C77D] transition-colors cursor-pointer"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subscription;
