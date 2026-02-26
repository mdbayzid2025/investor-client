"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import AllRequestList from "./AllRequestList";

export default function RequestBoard() {
    const [activeCategory, setActiveCategory] = useState("All");    
    const [activeTab, setActiveTab] = useState<"all" | "mylist">("all");

    const categories = [
        "All",
        "Vacant Land",
        "Farms",
        "Hotels",
        "Investment Portfolios",
    ];

    return (
        <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-10 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold">Request Board</h1>
                    <p className="text-sm text-gray-400">
                        Connect with the community anonymously.
                    </p>
                </div>                
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm border transition cursor-pointer ${activeCategory === cat
                            ? "bg-primary text-black border-[#E6C97A]"
                            : "border-[#E6C97A]/30 text-gray-300 hover:border-[#E6C97A]"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

          <AllRequestList />             
        </div>
    );
}