import React from 'react';
import { TrendingUp, DollarSign, Calendar, Users } from 'lucide-react';

export default function UserDashboard() {
  const stats = [
    {
      title: 'Total Investment',
      value: '$125,000',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      title: 'Active Projects',
      value: '8',
      change: '+2',
      icon: TrendingUp,
      trend: 'up',
    },
    {
      title: 'Upcoming Events',
      value: '3',
      change: 'This week',
      icon: Calendar,
      trend: 'neutral',
    },
    {
      title: 'Network',
      value: '156',
      change: '+23',
      icon: Users,
      trend: 'up',
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Welcome back, John!
        </h1>
        <p className="text-gray-400">
          Here&apos;s what&apos;s happening with your investments today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl p-6 hover:border-[#D4AF37]/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.trend === 'up'
                      ? 'text-green-500'
                      : stat.trend === 'down'
                      ? 'text-red-500'
                      : 'text-gray-400'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="px-6 py-3 bg-[#D4AF37] text-black font-medium rounded-lg hover:bg-[#E4C77D] transition-colors">
            New Investment
          </button>
          <button className="px-6 py-3 bg-[#1A1A1A] text-white font-medium rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors">
            View Reports
          </button>
          <button className="px-6 py-3 bg-[#1A1A1A] text-white font-medium rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors">
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
