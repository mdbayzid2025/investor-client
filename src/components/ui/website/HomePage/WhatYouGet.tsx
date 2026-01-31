import React from 'react'
import { Shield, Lock, MessageSquare, FileText, TrendingUp, CheckCircle, Eye, Users, ArrowRight, Castle } from 'lucide-react';
import { playFairDisplay } from '@/constants/playFairDisplay';

const WhatYouGet = () => {
    return (
        <section className="py10 lg:py-24 bg-gradient-to-b from-[#0A0A0A] to-black">
            <div className="">
                <div className="text-center mb-16">
                    <h2 className={`${playFairDisplay?.className} text-4xl md:text-5xl font-serif text-white font-semibold mb-4`}>
                        What You Get for  <span className='text-primary '>R99/Month</span> 
                    </h2>
                    <p className="text-xl text-gray-400">
                        Full access to South Africa's most discreet investor network
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Castle,
                            title: 'Off-Market Property Opportunities',
                            description: 'Access exclusive listings before they hit the public market. Development land, portfolios, and confidential sales.'
                        },
                        {
                            icon: MessageSquare,
                            title: 'Anonymous Investor Chat',
                            description: 'Connect with verified investors using anonymous IDs. No phone numbers or emails shared until you choose.'
                        },
                        {
                            icon: FileText,
                            title: 'Monthly Investor Brief',
                            description: 'Curated newsletter with new listings, developments, and market insights. High-value, low-noise.'
                        },
                        {
                            icon: Eye,
                            title: 'Priority Access',
                            description: 'See opportunities before they reach public listings. Get early-mover advantage on premium deals.'
                        },
                        {
                            icon: Users,
                            title: 'Verified Network Only',
                            description: 'Every member is verified. No time wasters, no spam. Professional investors and sellers only.'
                        },
                        {
                            icon: Shield,
                            title: 'Secure Platform Communication',
                            description: 'All communication handled through our secure platform. Complete confidentiality guaranteed.'
                        }
                    ].map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                                <benefit.icon className="w-7 h-7 text-[#D4AF37]" />
                            </div>
                            <h3 className="text-xl font-serif text-white mb-3">{benefit.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhatYouGet