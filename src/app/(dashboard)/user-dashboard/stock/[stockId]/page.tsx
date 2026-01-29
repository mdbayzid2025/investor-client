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
import { MOCK_STOCK } from "../../../../../../public/data/MockStockData";

export function StockDetails() {
  const { stockId } = useParams<{ stockId: string }>();
  const [interested, setInterested] = useState(false);

  const stockItem = MOCK_STOCK.find((item) => item.id === stockId);

  if (!stockItem) {
    return (
      <div className="p-8 text-center text-gray-400">
        <h2 className="text-2xl text-white mb-4">Property Not Found</h2>
        <Link
          href="/user-dashboard/stock"
          className="text-primary hover:underline"
        >
          Return to Stock
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-20">
      {/* Header / Nav */}
      <Link
        href="/user-dashboard/stock"
        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-6 group w-fit"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm sm:text-base">Back to Listings</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Visuals */}
        <div className="space-y-4 sm:space-y-6">
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden border border-primary/20 bg-[#111111]">
            {/* Main Image with Privacy Blur */}
            <div className="absolute inset-0 bg-black/10 z-10" />
            <Image
              src={stockItem.image}
              alt={stockItem.title}
              fill
              className="object-cover blur-sm"
            />
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                {stockItem.category}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded flex items-center gap-2 text-white/90 text-xs sm:text-sm border border-white/10">
              <Lock className="w-3 h-3 text-primary shrink-0" />
              <span>Visuals obfuscated for privacy</span>
            </div>
          </div>

          {/* Gallery Preview */}
          {stockItem.gallery && stockItem.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stockItem.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-20 sm:h-24 rounded-lg overflow-hidden border border-white/10 group cursor-pointer bg-[#111111]"
                >
                  <Image
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    className="object-cover blur-[2px] group-hover:blur-sm transition-all"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col h-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white mb-2">
            {stockItem.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 mb-6 text-sm">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>{stockItem.location || "Location Confidential"}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-[#1A1A1A] border border-primary/10 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                <DollarSign className="w-3 h-3 text-primary" />
                Price Guide
              </div>
              <p className="text-lg sm:text-xl text-white font-serif">
                {stockItem.priceRange || "POA"}
              </p>
            </div>
            <div className="bg-[#1A1A1A] border border-primary/10 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                <TrendingUp className="w-3 h-3 text-primary" />
                Est. Yield
              </div>
              <p className="text-lg sm:text-xl text-white font-serif">
                {stockItem.yield || "N/A"}
              </p>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-white font-medium mb-3 text-base sm:text-lg">
              Property Overview
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              {stockItem.description}
            </p>
          </div>

          {stockItem.features && stockItem.features.length > 0 && (
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
  );
}

export default StockDetails;
