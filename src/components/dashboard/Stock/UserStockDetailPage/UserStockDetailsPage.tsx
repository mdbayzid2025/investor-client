"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  TrendingUp,
  Check,
  Lock,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGetStockByIdQuery } from "@/redux/slice/stocksApi";
import { getImageUrl } from "@/utils/baseUrl";

// ────────────────────────────────────────────────
//  Import  RTK Query hook
// ────────────────────────────────────────────────

export default function UserStockDetailsPage() {
  const { stockId } = useParams<{ stockId: string }>();

  const [interested, setInterested] = useState(false);

  // Fetch stock data using RTK Query
  const {
    data: stockItem,
    isLoading,
    isError,
    error,
  } = useGetStockByIdQuery(stockId, {
    skip: !stockId, // prevent query if no ID
  });

  // ─── Loading state ───────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading property details...</p>
        </div>
      </div>
    );
  }

  // ─── Error state ─────────────────────────────────────────
  if (isError || !stockItem) {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-8">
        <div className="max-w-7xl mx-auto p-6 text-center">
          <h2 className="text-2xl text-red-400 mb-4">Property Not Found</h2>
          <p className="text-gray-400 mb-6">
            {/* @ts-ignore */}
            {isError && "error" in error
              ? (error as any).data?.message || "Failed to load property"
              : "The requested listing could not be found."}
          </p>
          <Link
            href="/user-dashboard/stock"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Listings
          </Link>
        </div>
      </div>
    );
  }

  // ─── Render when data exists ─────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto pb-20">
        {/* Back button */}
        <Link
          href="/user-dashboard/stock"
          className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-6 group w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base">Back to Listings</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ─── Left: Images ──────────────────────────────────── */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden border border-primary/20 bg-[#111111]">
              {/* Main image */}
              <div className="absolute inset-0 bg-black/10 z-10" />
              <Image
                src={stockItem?.images?.[0] ? getImageUrl() + stockItem?.images?.[0] : "/placeholder.png"}
                alt={stockItem.title}
                fill
                className={`object-cover ${stockItem?.isBlur ? "blur-sm" : ""}`}
                priority
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Agricultural
                </span>
              </div>

            </div>

            {/* Small gallery preview (if more images exist) */}
            {stockItem?.images?.length > 1 && (
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {stockItem?.images.slice(1).map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative h-20 sm:h-24 rounded-lg overflow-hidden border border-white/10 group cursor-pointer bg-[#111111]"
                  >
                    <Image
                      src={getImageUrl() + img}
                      alt={`Gallery ${idx + 1}`}
                      fill
                      className={`object-cover transition-all ${stockItem?.isBlur
                          ? "blur-[2px] group-hover:blur-sm"
                          : "blur-0 group-hover:scale-105"
                        }`}
                    />
                    <div className={`absolute inset-0 transition-colors ${stockItem?.isBlur
                        ? "bg-black/40 group-hover:bg-black/20"
                        : "bg-black/10 group-hover:bg-black/0"
                      }`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── Right: Details ────────────────────────────────── */}
          <div className="flex flex-col h-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white mb-2">
              {stockItem.title}
            </h1>

            <div className="flex items-center gap-2 text-gray-400 mb-6 text-sm">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{stockItem.location || "Location Confidential"}</span>
            </div>

            <div className="bg-[#1A1A1A] border border-primary/10 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                <DollarSign className="w-3 h-3 text-primary" />
                Price Guide
              </div>
              <p className="text-lg sm:text-xl text-white font-serif">
                {stockItem.price}
              </p>
            </div>

            <div className="mb-6 sm:mb-8">
              <h3 className="text-white font-medium mb-3 text-base sm:text-lg">
                Property Overview
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {stockItem.description}
              </p>
            </div>

            {stockItem.features?.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-white font-medium mb-3 text-base sm:text-lg">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                  {stockItem.features.map((feature: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm"
                    >
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA / Confidential notice */}
            <div className="mt-auto pt-6 sm:pt-8 border-t border-primary/20">
              <div className="bg-primary/5 border border-primary/20 p-4 sm:p-6 rounded-lg">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full shrink-0">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 text-sm sm:text-base">
                      Confidential Listing
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Full address, owner details, and un-blurred imagery are only
                      released after signing an NDA and verification by our
                      administrators.
                    </p>
                  </div>
                </div>

                {!interested ? (
                  <button
                    onClick={() => setInterested(true)}
                    className="w-full bg-primary text-black font-bold py-2.5 sm:py-3 rounded hover:bg-[#F4CF57] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    Request Full Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="bg-green-900/20 border border-green-500/30 p-3 sm:p-4 rounded text-center w-full">
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                      <p className="text-green-500 font-medium text-xs sm:text-sm">
                        Interest Registered
                      </p>
                      <p className="text-gray-400 text-[10px] sm:text-xs">
                        An admin will contact you shortly via the secure portal.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}