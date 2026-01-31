import { Check } from 'lucide-react';
import React from 'react'
import { Button } from '../../button';
import Link from 'next/link';

  const features = [
    'Unlimited investment posts',
    'Anonymous identity protection',
    'Internal secure messaging',
    'Verified investor network access',
    'Priority support',
    'Advanced search & filters',
    'Email notifications',
    'KYC verification'
  ];

const PricingCard = () => {
    return (
        <section className="py-16 bg-[#0A0A0A]">
            <div className="max-w-2xl mx-auto px-2 md:px-6">
                <div className="bg-gradient-to-b from-[#111111] to-[#0A0A0A] p-12 rounded-2xl border-2 border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-serif text-white mb-4">Premium Membership</h2>
                        <div className="flex items-baseline justify-center gap-2">
                            <span className="text-6xl font-serif text-[#D4AF37]">R99</span>
                            <span className="text-xl text-gray-400">/month</span>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                                <span className="text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Link href="/signup"><Button className="w-full">
                        Start Your Membership
                    </Button></Link>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Cancel anytime. No hidden fees.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default PricingCard