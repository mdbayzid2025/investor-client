"use client";
import { useState } from "react";
import { CheckCircle, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StockItem {
  _id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  size: string;
  images: string[];
  category?: string;       // optional – not present in your data
  features?: string[];      // optional
  status?: string;
  // owner, createdAt, updatedAt omitted unless needed in UI
}

export default function MyStockCard({
  item,
  canExpressInterest,
}: {
  item: StockItem;
  canExpressInterest: boolean;
}) {
  const [interested, setInterested] = useState(false);

  // Use first image if available, fallback to a placeholder
  const displayImage = item.images?.[0] || "/images/placeholder-land.jpg";

  // You can derive category or leave it out / hardcode / compute
  // For now we'll show "Land" or derive from title if needed
  const displayCategory = item.title.toLowerCase().includes("land") 
    ? "Agricultural Land" 
    : "Property";

  return (
    <div className="bg-[#111111] border border-primary/20 rounded-lg overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
      <Link
        href={`/user-dashboard/my-listing/stock/${item._id}`}
        className="block relative h-48 sm:h-56 lg:h-64 overflow-hidden cursor-pointer"
      >
        {/* Blurred Image Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* slightly darker for better text contrast */}
        <Image
          src={displayImage}
          alt={item.title}
          fill
          className="object-cover blur-sm scale-110 group-hover:scale-100 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute top-4 left-4 z-20">
          <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {displayCategory}
          </span>
        </div>
      </Link>

      <div className="p-4 sm:p-6 flex flex-col grow">
        <Link href={`/user-dashboard/my-listing/stock/${item._id}`} className="block">
          <h3 className="text-lg sm:text-xl font-serif text-white mb-2 hover:text-primary transition-colors">
            {item.title}
          </h3>
        </Link>

        <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Key highlighted info (visible teaser) */}
        <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wide">Size</p>
            <p className="text-white font-medium">{item.size}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wide">Price Range</p>
            <p className="text-white font-medium">{item.price}</p>
          </div>
        </div>

        {/* Restricted Info Notice */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-5 bg-[#1A1A1A] p-2.5 rounded border border-gray-800/50">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>Detailed location & full specs available after inquiry</span>
          </div>

          {canExpressInterest && (
            <div>
              {!interested ? (
                <button
                  onClick={() => setInterested(true)}
                  className="w-full bg-transparent border border-primary text-primary py-3 rounded font-medium hover:bg-primary hover:text-black transition-all duration-300 text-sm sm:text-base"
                >
                  Express Interest
                </button>
              ) : (
                <div className="bg-green-950/30 border border-green-700/40 p-4 rounded text-center">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <p className="text-green-400 font-medium">
                      Interest Registered
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      An administrator will contact you shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}