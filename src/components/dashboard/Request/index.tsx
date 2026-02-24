"use client";

import NewRequestModal from "@/components/dashboard/Request/NewRequestModal";
import { BookmarkCheck, LayoutList, Plus } from "lucide-react";
import { useState } from "react";
import AllRequestList from "./AllRequestList";
import MyRequest from "./MyRequest";

export default function RequestBoard() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState<"all" | "mylist">("all");
    const [savedRequests, setSavedRequests] = useState<number[]>([]);

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
                {activeTab !== "all" && <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-[#F1D98A] transition cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    New Request
                </button>}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 mb-6 bg-[#111111] border border-[#D4AF371A] rounded-xl p-1 w-fit">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${activeTab === "all"
                        ? "bg-primary text-black"
                        : "text-gray-400 hover:text-white"
                        }`}
                >
                    <LayoutList className="w-4 h-4" />
                    All Requests
                </button>
                <button
                    onClick={() => setActiveTab("mylist")}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${activeTab === "mylist"
                        ? "bg-primary text-black"
                        : "text-gray-400 hover:text-white"
                        }`}
                >
                    <BookmarkCheck className="w-4 h-4" />
                    My List
                    {savedRequests.length > 0 && (
                        <span
                            className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${activeTab === "mylist"
                                ? "bg-black/20 text-black"
                                : "bg-primary/20 text-primary"
                                }`}
                        >
                            {savedRequests.length}
                        </span>
                    )}
                </button>
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

            {activeTab === "all" ? <AllRequestList /> : <MyRequest />}
            <NewRequestModal open={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}