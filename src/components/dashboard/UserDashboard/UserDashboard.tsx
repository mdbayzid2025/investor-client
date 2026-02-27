'use client'
import { useGetProfileQuery, useGetUserAnalyticsQuery } from '@/redux/slice/userApi';
import { Briefcase, CreditCard, Package, User } from "lucide-react";
import Link from 'next/link';

const UserDashboard = () => {

    const { data: profileData } = useGetProfileQuery({});

    const { data: userAnalytics } = useGetUserAnalyticsQuery({});

    const stats = [
        { label: "Verified", value: "Active Member", dot: userAnalytics?.user?.isVerified },
        { label: "Plan", value: "Premium Access", dot: userAnalytics?.user?.isSubscribed
 },
        { label: "Requests", value: `${userAnalytics?.totalRequests} Active` },
        { label: "Interests", value: `${userAnalytics?.totalInterested} Saved` },
    ];

    const actions = [
        {
            title: "Requests",
            description: "Browse and post investment requirements.",
            href: "/user-dashboard/requests",
            icon: Briefcase,
        },
        {
            title: "Stock",
            description: "View curated property listings.",
            href: "/user-dashboard/stock",
            icon: Package,
        },
        {
            title: "Subscription",
            description: "Manage your membership plan.",
            href: "/user-dashboard/subscription",
            icon: CreditCard,
        },
        {
            title: "Profile",
            description: "Update your role and preferences.",
            href: "/user-dashboard/profile",
            icon: User,
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white px-6 lg:px-10 py-8">
            <div className="mb-10">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold  mb-2">
                    Welcome, <span className='text-primary'>{profileData?.name}</span>
                </h1>
                <p className="text-xs sm:text-base text-gray-400">
                    Your premium gateway to exclusive property opportunities.
                </p>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6 mb-12">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-[#0D0D0D] border border-[#E6C97A]/20 rounded-xl px-6 py-5"
                    >
                        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                            {stat.label}
                        </p>
                        <div className="flex items-center gap-2">
                            <p className="xl:text-lg font-medium">{stat.value}</p>
                            {(stat.label !== "Interests" && stat.label !== "Requests") && (
                                stat.dot === true ? (
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                ) : (
                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>


            {/* Quick Actions */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {actions.map((action, i) => {
                        const Icon = action.icon;
                        return (
                            <div
                                key={i}
                                className="bg-[#111111] border border-[#D4AF3733] rounded-xl p-6 hover:border-[#E6C97A]/50 transition-all cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#D4AF371A] flex items-center justify-center mb-4">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-lg font-medium mb-1">{action.title}</h3>
                                <p className="text-xs sm:text-sm text-[#99A1AF] mb-4">
                                    {action.description}
                                </p>
                                <Link href={action.href} className="text-sm text-primary">
                                    Open →
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserDashboard