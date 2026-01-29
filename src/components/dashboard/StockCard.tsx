"use client";
import { useState } from "react";
import { CheckCircle, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StockItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

export default function StockCard({
  item,
  canExpressInterest,
}: {
  item: StockItem;
  canExpressInterest: boolean;
}) {
  const [interested, setInterested] = useState(false);
  return (
    <div className="bg-[#111111] border border-primary/20 rounded-lg overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
      <Link
        href={`/user-dashboard/stock/${item.id}`}
        className="block relative h-48 sm:h-56 lg:h-64 overflow-hidden cursor-pointer"
      >
        {/* Blurred Image Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10" />
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover blur-sm scale-110 group-hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {item.category}
          </span>
        </div>
      </Link>

      <div className="p-4 sm:p-6 flex flex-col grow">
        <Link href={`/user-dashboard/stock/${item.id}`} className="block">
          <h3 className="text-lg sm:text-xl font-serif text-white mb-2 hover:text-primary transition-colors">
            {item.title}
          </h3>
        </Link>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Restricted Info Notice */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 sm:mb-6 bg-[#1A1A1A] p-2 rounded">
            <Lock className="w-3 h-3 shrink-0" />
            <span>Location & Price hidden for privacy</span>
          </div>

          {canExpressInterest && (
            <div>
              {!interested ? (
                <button
                  onClick={() => setInterested(true)}
                  className="w-full bg-transparent border border-primary text-primary py-2.5 sm:py-3 rounded font-medium hover:bg-primary hover:text-black transition-all text-sm sm:text-base"
                >
                  I&apos;m Interested
                </button>
              ) : (
                <div className="bg-green-900/20 border border-green-500/30 p-3 sm:p-4 rounded text-center">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    <p className="text-green-500 font-medium text-xs sm:text-sm">
                      Interest Sent
                    </p>
                    <p className="text-gray-400 text-[10px] sm:text-xs">
                      An administrator will contact you offline.
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
